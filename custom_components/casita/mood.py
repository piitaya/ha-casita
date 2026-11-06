"""Mood of Casita: six variables drifting back to their baselines."""

from collections.abc import Mapping
from dataclasses import dataclass
from datetime import datetime, timedelta
from enum import StrEnum
import math
from typing import TYPE_CHECKING, Final, TypedDict

from homeassistant.const import STATE_HOME, STATE_UNAVAILABLE, STATE_UNKNOWN
from homeassistant.core import Event, EventStateChangedData, HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.event import (
    TrackStates,
    async_track_state_change_filtered,
    async_track_time_interval,
)
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import CONF_WEATHER_ENTITY, DOMAIN, LOGGER, SIGNAL_MOOD_UPDATED
from .emotion import Emotion

if TYPE_CHECKING:
    from .models import CasitaConfigEntry

STORAGE_VERSION: Final = 1
# Inputs are saved after this delay, and on unload and shutdown
SAVE_DELAY: Final = 30
UPDATE_INTERVAL: Final = timedelta(seconds=30)


class MoodVariable(StrEnum):
    """Variables of the mood (motion spec §5)."""

    JOY = "joy"
    """Valence, -1 (sad) to 1 (happy)."""

    EXCITEMENT = "excitement"
    """Arousal, 0 (calm) to 1 (excited)."""

    ENERGY = "energy"
    AFFECTION = "affection"
    IRRITATION = "irritation"
    CURIOSITY = "curiosity"


class Interaction(StrEnum):
    """What the user did to Casita in the panel."""

    PET = "pet"
    POKE = "poke"
    TICKLE = "tickle"
    HUG = "hug"
    SHAKE = "shake"
    THROW = "throw"
    WAKE = "wake"
    GREET = "greet"
    IGNORE = "ignore"


INTERACTIONS: Final = tuple(interaction.value for interaction in Interaction)

type MoodDelta = Mapping[MoodVariable, float]

_JOY = MoodVariable.JOY
_EXCITEMENT = MoodVariable.EXCITEMENT
_ENERGY = MoodVariable.ENERGY
_AFFECTION = MoodVariable.AFFECTION
_IRRITATION = MoodVariable.IRRITATION
_CURIOSITY = MoodVariable.CURIOSITY

RANGES: Final[Mapping[MoodVariable, tuple[float, float]]] = {
    variable: (-1.0, 1.0) if variable is _JOY else (0.0, 1.0)
    for variable in MoodVariable
}

# Time constants of the exponential decay toward the baseline, in seconds:
# x += (baseline - x) * (1 - exp(-dt / tau)). The half-life is tau * ln 2.
TIME_CONSTANTS: Final[Mapping[MoodVariable, float]] = {
    _JOY: 40,
    _EXCITEMENT: 12,
    _ENERGY: 120,
    _IRRITATION: 8,
    _CURIOSITY: 15,
}
# Affection moves slowly and in a straight line
AFFECTION_BASELINE: Final = 0.3
AFFECTION_DECAY_PER_SECOND: Final = 0.01 / 86400
# At night, energy above its baseline drops this many times faster
NIGHT_ENERGY_SPEEDUP: Final = 2.0
NIGHT_START_HOUR: Final = 22
NIGHT_END_HOUR: Final = 7
# Joy baseline is 0.25 + 0.1 * affection, lower while it rains
RAIN_JOY_OFFSET: Final = -0.1
# Conditions of weather entities, Casita does not depend on weather or sun
RAINY_CONDITIONS: Final = frozenset(
    {"lightning-rainy", "pouring", "rainy", "snowy-rainy"}
)
SUN_ENTITY_ID: Final = "sun.sun"
SUN_BELOW_HORIZON: Final = "below_horizon"
PERSON_DOMAIN: Final = "person"

# Deltas of the motion spec, for one event at the default intensity
DEFAULT_INTENSITY: Final = 0.5
INTERACTION_DELTAS: Final[Mapping[Interaction, MoodDelta]] = {
    # Petting, for one second
    Interaction.PET: {
        _JOY: 0.12,
        _EXCITEMENT: -0.05,
        _AFFECTION: 0.05,
        _IRRITATION: -0.15,
    },
    # A single poke, rapid pokes are added above the default intensity
    Interaction.POKE: {
        _JOY: 0.03,
        _EXCITEMENT: 0.2,
        _IRRITATION: 0.08,
        _CURIOSITY: 0.1,
    },
    # Tickling, for one second
    Interaction.TICKLE: {
        _JOY: 0.15,
        _EXCITEMENT: 0.2,
        _ENERGY: -0.03,
        _AFFECTION: 0.01,
        _IRRITATION: -0.05,
    },
    # Long press
    Interaction.HUG: {_JOY: 0.15, _AFFECTION: 0.04, _IRRITATION: -0.1},
    # Hard shake
    Interaction.SHAKE: {
        _JOY: -0.25,
        _EXCITEMENT: 0.4,
        _ENERGY: -0.05,
        _AFFECTION: -0.05,
        _IRRITATION: 0.35,
    },
    # Gentle throw
    Interaction.THROW: {_JOY: 0.05, _EXCITEMENT: 0.3, _ENERGY: -0.02, _CURIOSITY: 0.1},
    # Not in the spec: woken up, a bit startled and curious
    Interaction.WAKE: {_EXCITEMENT: 0.25, _ENERGY: 0.1, _CURIOSITY: 0.1},
    # The viewer arrives
    Interaction.GREET: {_JOY: 0.05, _EXCITEMENT: 0.15, _CURIOSITY: 0.2},
    # The viewer left for a long time
    Interaction.IGNORE: {_JOY: -0.1},
}
RAPID_POKE_DELTA: Final[MoodDelta] = {_JOY: -0.05, _EXCITEMENT: 0.15, _IRRITATION: 0.18}

CONVERSATION_DELTA: Final[MoodDelta] = {
    _JOY: 0.05,
    _EXCITEMENT: 0.1,
    _AFFECTION: 0.01,
    _CURIOSITY: 0.15,
}
NICE_WORDS_DELTA: Final[MoodDelta] = {_JOY: 0.2, _AFFECTION: 0.03, _IRRITATION: -0.2}
NICE_EMOTIONS: Final = frozenset({Emotion.LOVING, Emotion.GRATEFUL})
# Not in the spec
INSULT_DELTA: Final[MoodDelta] = {_JOY: -0.2, _IRRITATION: 0.3}
INSULT_EMOTIONS: Final = frozenset({Emotion.ANGRY, Emotion.HURT})
ERROR_DELTA: Final[MoodDelta] = {_JOY: -0.05, _IRRITATION: 0.1}
PERSON_HOME_DELTA: Final[MoodDelta] = {_JOY: 0.2, _EXCITEMENT: 0.3}


def energy_baseline(hour: int) -> float:
    """Return the baseline of energy at an hour of the day (motion spec §5)."""
    if 7 <= hour < 10:
        return 0.8
    if 10 <= hour < 19:
        return 0.7
    if 19 <= hour < 22:
        return 0.5
    return 0.25


def interaction_delta(kind: Interaction, intensity: float) -> dict[MoodVariable, float]:
    """Return the change of an interaction.

    The default intensity gives the deltas of the spec, twice that doubles them.
    Pokes above the default intensity count as rapid pokes.
    """
    scale = intensity / DEFAULT_INTENSITY
    delta = {
        variable: value * min(scale, 1.0)
        for variable, value in INTERACTION_DELTAS[kind].items()
    }
    extra = INTERACTION_DELTAS[kind]
    if kind is Interaction.POKE:
        extra = RAPID_POKE_DELTA
    for variable, value in extra.items():
        delta[variable] = delta.get(variable, 0.0) + value * max(scale - 1.0, 0.0)
    return delta


class StoredMood(TypedDict):
    """Mood saved across restarts."""

    values: dict[str, float]
    updated: str


@dataclass(frozen=True, slots=True)
class MoodValue:
    """A variable of the mood, as shown by its sensor."""

    value: float
    baseline: float


# Words describing the mood in the persona: (variable, above, threshold, en, fr).
# The first match of a variable wins, the strongest three are kept.
_DESCRIPTIONS: Final[tuple[tuple[MoodVariable, bool, float, str, str], ...]] = (
    (_ENERGY, False, 0.2, "very tired", "très fatigué"),
    (_ENERGY, False, 0.4, "a bit tired", "un peu fatigué"),
    (_ENERGY, True, 0.75, "full of energy", "plein d'énergie"),
    (_AFFECTION, True, 0.75, "very affectionate", "très affectueux"),
    (_AFFECTION, True, 0.55, "affectionate", "affectueux"),
    (_AFFECTION, False, 0.15, "a bit distant", "un peu distant"),
    (_JOY, True, 0.65, "delighted", "ravi"),
    (_JOY, True, 0.45, "cheerful", "joyeux"),
    (_JOY, False, -0.4, "sad", "triste"),
    (_JOY, False, -0.1, "a bit down", "un peu triste"),
    (_EXCITEMENT, True, 0.75, "very excited", "surexcité"),
    (_EXCITEMENT, True, 0.55, "excited", "tout excité"),
    (_IRRITATION, True, 0.6, "annoyed", "agacé"),
    (_IRRITATION, True, 0.3, "a bit annoyed", "un peu agacé"),
    (_CURIOSITY, True, 0.7, "very curious", "très curieux"),
    (_CURIOSITY, True, 0.5, "curious", "curieux"),
)
_MOOD_LINE: Final = {
    "en": ("Your mood right now: {}. Let it show without talking about it.", "and"),
    "fr": ("Ton humeur du moment : {}. Laisse-la transparaître sans en parler.", "et"),
}
_CALM: Final = {"en": "calm and content", "fr": "calme et serein"}


def describe_mood(values: Mapping[MoodVariable, float], language: str) -> str:
    """Return one line describing the mood, in English or French."""
    found: dict[MoodVariable, tuple[float, str]] = {}
    for variable, above, threshold, english, french in _DESCRIPTIONS:
        if variable in found:
            continue
        value = values[variable]
        strength = value - threshold if above else threshold - value
        if strength > 0:
            found[variable] = (strength, french if language == "fr" else english)
    words = [
        word
        for _strength, word in sorted(found.values(), key=lambda item: -item[0])[:3]
    ]
    template, conjunction = _MOOD_LINE["fr" if language == "fr" else "en"]
    if not words:
        return template.format(_CALM["fr" if language == "fr" else "en"])
    if len(words) == 1:
        return template.format(words[0])
    return template.format(f"{', '.join(words[:-1])} {conjunction} {words[-1]}")


class CasitaMood:
    """Mood of one Casita, saved across restarts."""

    def __init__(self, hass: HomeAssistant, entry: CasitaConfigEntry) -> None:
        """Initialize the mood."""
        self.hass = hass
        self._entry = entry
        self._store = Store[StoredMood](hass, STORAGE_VERSION, storage_key(entry))
        self._updated = dt_util.utcnow()
        self._values: dict[MoodVariable, float] = {}
        self._baselines: dict[MoodVariable, float] = {}
        self._published: dict[MoodVariable, MoodValue] = {}

    async def async_load(self) -> None:
        """Load the saved mood, as it is now."""
        now = dt_util.utcnow()
        self._baselines = self._compute_baselines(now, AFFECTION_BASELINE)
        self._values = dict(self._baselines)
        if (stored := await self._store.async_load()) is not None:
            for variable in MoodVariable:
                if isinstance(value := stored["values"].get(variable), int | float):
                    self._values[variable] = _clamp(variable, float(value))
            if (updated := dt_util.parse_datetime(stored["updated"])) is not None:
                self._updated = min(updated, now)
        self._update(now)
        self._published = self.values

    @callback
    def async_start(self) -> None:
        """Update the mood over time and listen to the house."""
        entry = self._entry
        entry.async_on_unload(
            async_track_time_interval(
                self.hass,
                self._async_tick,
                UPDATE_INTERVAL,
                name="Casita mood",
                cancel_on_shutdown=True,
            )
        )
        entry.async_on_unload(
            async_track_state_change_filtered(
                self.hass,
                TrackStates(False, set(), {PERSON_DOMAIN}),
                self._async_person_changed,
            ).async_remove
        )

    async def async_save(self) -> None:
        """Save the mood now."""
        await self._store.async_save(self._data_to_save())

    @property
    def values(self) -> dict[MoodVariable, MoodValue]:
        """Return the variables with their baselines, rounded like the sensors."""
        return {
            variable: MoodValue(
                round(self._values[variable], 2), round(self._baselines[variable], 2)
            )
            for variable in MoodVariable
        }

    @callback
    def async_describe(self, language: str) -> str:
        """Return the mood as one line for the persona."""
        self._update(dt_util.utcnow())
        return describe_mood(self._values, language)

    @callback
    def async_interact(self, kind: Interaction, intensity: float) -> None:
        """Apply an interaction from the panel."""
        self._async_apply(f"interaction {kind}", interaction_delta(kind, intensity))

    @callback
    def async_conversation(
        self, emotion: Emotion, *, insult: bool, error: bool
    ) -> None:
        """Apply a reply of Casita."""
        deltas = [CONVERSATION_DELTA]
        if emotion in NICE_EMOTIONS:
            deltas.append(NICE_WORDS_DELTA)
        if insult or emotion in INSULT_EMOTIONS:
            deltas.append(INSULT_DELTA)
        if error:
            deltas.append(ERROR_DELTA)
        total: dict[MoodVariable, float] = {}
        for delta in deltas:
            for variable, value in delta.items():
                total[variable] = total.get(variable, 0.0) + value
        self._async_apply(f"reply {emotion}", total)

    @callback
    def _async_person_changed(self, event: Event[EventStateChangedData]) -> None:
        """Cheer up when someone arrives home."""
        old_state = event.data["old_state"]
        new_state = event.data["new_state"]
        if (
            old_state is None
            or new_state is None
            or new_state.state != STATE_HOME
            or old_state.state in (STATE_HOME, STATE_UNKNOWN, STATE_UNAVAILABLE)
        ):
            return
        self._async_apply(f"{new_state.entity_id} arrived", PERSON_HOME_DELTA)

    @callback
    def _async_apply(self, reason: str, delta: MoodDelta) -> None:
        """Add a change to the mood."""
        self._update(dt_util.utcnow())
        for variable, value in delta.items():
            self._values[variable] = _clamp(variable, self._values[variable] + value)
        LOGGER.debug(
            "Mood after %s: %s",
            reason,
            {
                variable.value: round(value, 2)
                for variable, value in self._values.items()
            },
        )
        self._store.async_delay_save(self._data_to_save, SAVE_DELAY)
        self._async_publish()

    @callback
    def _async_tick(self, now: datetime) -> None:
        """Let the mood drift back to its baselines."""
        self._update(dt_util.utcnow())
        self._async_publish()

    @callback
    def _async_publish(self) -> None:
        """Tell the sensors when a rounded value or baseline changed."""
        if (values := self.values) == self._published:
            return
        self._published = values
        async_dispatcher_send(
            self.hass, SIGNAL_MOOD_UPDATED.format(self._entry.entry_id)
        )

    def _update(self, now: datetime) -> None:
        """Move the variables toward their baselines up to now."""
        self._baselines = self._compute_baselines(now, self._values[_AFFECTION])
        if (elapsed := (now - self._updated).total_seconds()) <= 0:
            return
        night = self._is_night(now)
        for variable in MoodVariable:
            value = self._values[variable]
            baseline = self._baselines[variable]
            if variable is _AFFECTION:
                step = AFFECTION_DECAY_PER_SECOND * elapsed
                if abs(value - baseline) <= step:
                    value = baseline
                else:
                    value -= math.copysign(step, value - baseline)
            else:
                tau = TIME_CONSTANTS[variable]
                if variable is _ENERGY and night and value > baseline:
                    tau /= NIGHT_ENERGY_SPEEDUP
                value = baseline + (value - baseline) * math.exp(-elapsed / tau)
            self._values[variable] = value
        self._updated = now

    def _compute_baselines(
        self, now: datetime, affection: float
    ) -> dict[MoodVariable, float]:
        """Return the baselines at a time."""
        joy = 0.25 + 0.1 * affection
        if self._is_raining():
            joy += RAIN_JOY_OFFSET
        return {
            _JOY: joy,
            _EXCITEMENT: 0.35,
            _ENERGY: energy_baseline(dt_util.as_local(now).hour),
            _AFFECTION: AFFECTION_BASELINE,
            _IRRITATION: 0.0,
            _CURIOSITY: 0.3,
        }

    def _is_night(self, now: datetime) -> bool:
        """Return if it is late and the sun is down."""
        hour = dt_util.as_local(now).hour
        if NIGHT_END_HOUR <= hour < NIGHT_START_HOUR:
            return False
        sun = self.hass.states.get(SUN_ENTITY_ID)
        return sun is None or sun.state == SUN_BELOW_HORIZON

    def _is_raining(self) -> bool:
        """Return if the weather entity of the options says it rains."""
        if not (entity_id := self._entry.options.get(CONF_WEATHER_ENTITY)):
            return False
        state = self.hass.states.get(entity_id)
        return state is not None and state.state in RAINY_CONDITIONS

    @callback
    def _data_to_save(self) -> StoredMood:
        """Return the mood to save."""
        return {
            "values": {
                variable.value: value for variable, value in self._values.items()
            },
            "updated": self._updated.isoformat(),
        }


def storage_key(entry: CasitaConfigEntry) -> str:
    """Return the key of the saved mood of an entry."""
    return f"{DOMAIN}.{entry.entry_id}.mood"


def _clamp(variable: MoodVariable, value: float) -> float:
    low, high = RANGES[variable]
    return min(max(value, low), high)

"""Casita emotions: deterministic rules and reply tag parsing."""

from collections.abc import Mapping
from dataclasses import dataclass
from datetime import datetime, time, timedelta
from enum import StrEnum
import random
import re
from typing import Any, Final

from homeassistant.const import UnitOfTemperature
from homeassistant.core import (
    Context,
    HomeAssistant,
    callback,
    split_entity_id,
    valid_entity_id,
)
from homeassistant.helpers import intent
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.util.unit_conversion import TemperatureConverter

from .const import (
    ATTR_AGENT_ID,
    ATTR_CONVERSATION_ID,
    ATTR_DEVICE_ID,
    ATTR_EMOTION,
    ATTR_EMOTION_SOURCE,
    ATTR_LOCAL_RESULT,
    ATTR_PATH,
    ATTR_RESTYLE,
    ATTR_SOURCE,
    ATTR_TEXT,
    ATTR_TIMINGS_MS,
    ATTR_UPDATED,
    EVENT_CASITA_EMOTION,
    SIGNAL_EMOTION_UPDATED,
)


class Emotion(StrEnum):
    """Expressions Casita can show."""

    NORMAL = "Normal"
    ALERT = "Alert"
    ANGRY = "Angry"
    SCARED = "Scared"
    CHEEKY = "Cheeky"
    DEAD_ASS = "DeadAss"
    DEAD = "Dead"
    DEVIOUS = "Devious"
    FOCUSING = "Focusing"
    GRATEFUL = "Grateful"
    GRINNING = "Grinning"
    HAPPY = "Happy"
    HURT = "Hurt"
    INITIALIZING = "Initializing"
    LOADING = "Loading"
    LOVING = "Loving"
    NO_INTERNET = "NoInternet"
    PLEADING = "Pleading"
    PROBLEM = "Problem"
    SAD = "Sad"
    SILLY = "Silly"
    SLEEPING = "Sleeping"
    SMILING = "Smiling"
    SWEATING = "Sweating"
    UWU = "UwU"
    WTF = "WTF"
    WINKING = "Winking"
    WINKING_SMILE = "WinkingSmile"


EMOTIONS: Final = tuple(emotion.value for emotion in Emotion)


class EmotionSource(StrEnum):
    """Where the emotion of a reply comes from."""

    LOCAL = "local"
    """Reply handled locally, emotion from the rules (or the restyle)."""

    LLM = "llm"
    """Reply from the LLM agent, emotion from its tag."""

    FALLBACK = "fallback"
    """Emotion picked after a missing or invalid tag, or an error in Casita."""

    MANUAL = "manual"
    """Emotion set with the set_emotion action."""


class ReplyPath(StrEnum):
    """Which agent answered."""

    LOCAL = "local"
    """Command understood locally before asking the LLM agent."""

    LLM = "llm"
    """Answered by the LLM agent."""

    LOCAL_FALLBACK = "local_fallback"
    """Answered by the local agent because no LLM agent is set or available."""


class RestyleResult(StrEnum):
    """What happened to the rewrite of a local reply."""

    OFF = "off"
    APPLIED = "applied"
    REJECTED_NUMBERS = "rejected_numbers"
    REJECTED_LENGTH = "rejected_length"
    TIMEOUT = "timeout"
    ERROR = "error"


class LocalResult(StrEnum):
    """What local commands made of the input."""

    MATCHED = "matched"
    """Handled locally."""

    NO_MATCH = "no_match"
    """No sentence matched exactly."""

    FILTERED = "filtered"
    """Matched, but left to an LLM agent that can control the home."""

    NO_VALID_TARGETS = "no_valid_targets"
    """Matched, but no exposed and available entity fits."""

    OTHER_ERROR = "other_error"
    """Matched, and failed while acting. The error is the reply."""


@dataclass(frozen=True, slots=True, kw_only=True)
class LocalMatch:
    """Result of local commands, to debug a reply."""

    result: LocalResult
    language: str | None = None
    intent: str | None = None
    slots: dict[str, Any] | None = None
    error_code: str | None = None

    def as_dict(self) -> dict[str, Any]:
        """Return the result as event data."""
        return {
            "result": self.result.value,
            "language": self.language,
            "intent": self.intent,
            "slots": self.slots,
            "error_code": self.error_code,
        }


@dataclass(frozen=True, slots=True, kw_only=True)
class ReplyDetails:
    """How a reply was made, to debug it."""

    path: ReplyPath
    restyle: RestyleResult = RestyleResult.OFF
    original_text: str | None = None
    """Local reply before the rewrite."""

    local: LocalMatch | None = None
    local_ms: int | None = None
    llm_ms: int | None = None
    ai_task_ms: int | None = None
    total_ms: int | None = None

    @property
    def timings_ms(self) -> dict[str, int | None]:
        """Return the timings in milliseconds."""
        return {
            "local": self.local_ms,
            "llm": self.llm_ms,
            "ai_task": self.ai_task_ms,
            "total": self.total_ms,
        }


@dataclass(frozen=True, slots=True, kw_only=True)
class EmotionUpdate:
    """Emotion attached to a reply."""

    emotion: Emotion
    source: EmotionSource
    text: str | None
    agent_id: str | None
    conversation_id: str | None
    device_id: str | None
    updated: datetime
    details: ReplyDetails | None = None
    origin: EmotionOrigin | None = None

    def as_dict(self) -> dict[str, Any]:
        """Return the update as event data."""
        details = self.details
        return {
            ATTR_EMOTION: self.emotion.value,
            ATTR_SOURCE: self.source.value,
            ATTR_EMOTION_SOURCE: self.origin.value if self.origin else None,
            ATTR_TEXT: self.text,
            ATTR_AGENT_ID: self.agent_id,
            ATTR_CONVERSATION_ID: self.conversation_id,
            ATTR_DEVICE_ID: self.device_id,
            ATTR_UPDATED: self.updated.isoformat(),
            ATTR_PATH: details.path.value if details else None,
            ATTR_RESTYLE: details.restyle.value if details else None,
            ATTR_TIMINGS_MS: details.timings_ms if details else None,
            ATTR_LOCAL_RESULT: (
                details.local.as_dict() if details and details.local else None
            ),
        }


@callback
def async_publish_emotion(
    hass: HomeAssistant,
    entry_id: str,
    update: EmotionUpdate,
    context: Context | None = None,
) -> None:
    """Show an emotion on the sensors, then fire the event."""
    async_dispatcher_send(hass, SIGNAL_EMOTION_UPDATED.format(entry_id), update)
    hass.bus.async_fire(EVENT_CASITA_EMOTION, update.as_dict(), context=context)


# Tag parsing

_EMOTIONS_BY_KEY: Final = {emotion.value.casefold(): emotion for emotion in Emotion}
_KEY_SEPARATORS = re.compile(r"[\s_-]+")
_TAG = re.compile(r"[ \t]*\[\s*emotion\s*[:=]\s*([^\[\]]*?)\s*\][ \t]*", re.IGNORECASE)
_LEADING_TAG = re.compile(r"\[\s*emotion\s*[:=]\s*([^\[\]]*?)\s*\]\s*", re.IGNORECASE)
# Longest tag we wait for in a stream before giving up and passing the text on
_MAX_TAG_LENGTH = 40


def parse_emotion(value: Any) -> Emotion | None:
    """Return the emotion matching an id, ignoring case, spaces and separators."""
    if not isinstance(value, str):
        return None
    return _EMOTIONS_BY_KEY.get(_KEY_SEPARATORS.sub("", value).casefold())


@dataclass(frozen=True, slots=True)
class TaggedText:
    """Reply text without its emotion tags."""

    text: str
    emotion: Emotion | None
    has_tag: bool


def extract_emotion_tag(text: str) -> TaggedText:
    """Remove every emotion tag from a text and return the first valid emotion."""
    emotion: Emotion | None = None
    has_tag = False
    for match in _TAG.finditer(text):
        has_tag = True
        if emotion is None:
            emotion = parse_emotion(match.group(1))
    if not has_tag:
        return TaggedText(text, None, False)
    return TaggedText(_TAG.sub(" ", text).strip(), emotion, True)


class EmotionTagStreamFilter:
    """Hold back the start of a streamed message until its tag is removed.

    The tag must never reach text-to-speech, so content is only passed on once
    it is clear whether the message starts with a tag.
    """

    def __init__(self) -> None:
        """Initialize the filter."""
        self._pending: str | None = ""
        self._after_tag = False
        self.emotion: Emotion | None = None

    def start_message(self) -> None:
        """Start a new message, which can start with its own tag."""
        self._pending = ""
        self._after_tag = False

    def feed(self, content: str) -> str:
        """Return the part of the content that can be passed on."""
        if self._pending is None:
            if self._after_tag:
                content = content.lstrip()
                self._after_tag = not content
            return content
        buffer = self._pending + content
        stripped = buffer.lstrip()
        if not stripped:
            self._pending = buffer
            return ""
        if stripped[0] != "[":
            self._pending = None
            return buffer
        if match := _LEADING_TAG.match(stripped):
            self._pending = None
            if self.emotion is None:
                self.emotion = parse_emotion(match.group(1))
            rest = stripped[match.end() :]
            self._after_tag = not rest
            return rest
        if "]" in stripped or len(stripped) > _MAX_TAG_LENGTH:
            # Brackets, but not an emotion tag
            self._pending = None
            return buffer
        self._pending = buffer
        return ""

    def flush(self) -> str:
        """Return the content still held back at the end of the stream."""
        pending, self._pending = self._pending, None
        if not pending:
            return ""
        return extract_emotion_tag(pending).text


# Rules

_EVENING_START = time(18)
_LATE_NIGHT_START = time(23)
_LATE_NIGHT_END = time(5)
_HOT_TEMPERATURE = 24.0  # °C

# Intents of integrations Casita does not depend on
_INTENT_CLIMATE_SET_TEMPERATURE = "HassClimateSetTemperature"
_INTENT_GET_WEATHER = "HassGetWeather"

_RAINY_CONDITIONS = frozenset({"rainy", "pouring", "lightning-rainy", "snowy-rainy"})
_SUNNY_CONDITIONS = frozenset({"sunny"})

_RAIN_WORDS = re.compile(
    r"\b(rain\w*|pouring|showers?|drizzle|pluie\w*|pluvieu\w*|pleu\w*|averses?|bruine)\b",
    re.IGNORECASE,
)
_SUN_WORDS = re.compile(r"\b(sun|sunny|sunshine|soleil|ensoleill\w*)\b", re.IGNORECASE)

_INSULT_WORDS = re.compile(
    r"\b(nul(?!le\s+part)(?:le)?s?|b[eê]tes?|idiote?s?|stupides?|stupid|dumb|useless)\b",
    re.IGNORECASE,
)
_LOVE_WORDS = re.compile(
    r"\b(je\s+t['\u2019]\s*(?:aime|adore)|(?:i\s+)?love\s+(?:you|u))\b", re.IGNORECASE
)
_THANKS_WORDS = re.compile(r"\b(merci|thanks|thank\s+you|thx)\b", re.IGNORECASE)


class EmotionOrigin(StrEnum):
    """What picked the emotion of a reply."""

    RULES = "rules"
    """The rules below, from the response of the local agent."""

    KEYWORD = "keyword"
    """What the user said: thanks, love or an insult."""

    LLM_TAG = "llm_tag"
    """The tag the LLM agent wrote."""

    AI_TASK = "ai_task"
    """The AI Task, with the rewrite or as fallback."""


class Outcome(StrEnum):
    """What happened, as the rules see it."""

    ALL_FAILED = "all_failed"
    PARTIAL_FAILURE = "partial_failure"
    HOT = "hot"
    LATE_NIGHT_OFF = "late_night_off"
    CLOSED = "closed"
    EVENING_LIGHT = "evening_light"
    REPEATED = "repeated"
    ANNOYED = "annoyed"
    SUCCESS = "success"
    RAIN = "rain"
    SUN = "sun"
    ANSWER = "answer"
    NO_INTENT_MATCH = "no_intent_match"
    NO_VALID_TARGETS = "no_valid_targets"
    FAILED_TO_HANDLE = "failed_to_handle"
    OTHER_ERROR = "other_error"


@dataclass(frozen=True, slots=True)
class Candidate:
    """An expression a rule can show.

    Its weight grows with a variable of the mood, or with its opposite.
    """

    emotion: Emotion
    weight: float = 1.0
    boost: str | None = None
    low: bool = False


_E = Emotion
# The emotions of each outcome, the first one is the usual one. The mood
# weights the draw: low energy favors Smiling, high excitement Grinning, high
# affection WinkingSmile.
RULES: Final[dict[Outcome, tuple[Candidate, ...]]] = {
    Outcome.ALL_FAILED: (Candidate(_E.PROBLEM),),
    Outcome.PARTIAL_FAILURE: (Candidate(_E.SWEATING),),
    Outcome.HOT: (Candidate(_E.SWEATING),),
    Outcome.LATE_NIGHT_OFF: (Candidate(_E.SLEEPING),),
    Outcome.CLOSED: (Candidate(_E.WINKING),),
    Outcome.EVENING_LIGHT: (Candidate(_E.SMILING),),
    Outcome.REPEATED: (Candidate(_E.CHEEKY),),
    Outcome.ANNOYED: (Candidate(_E.DEAD_ASS),),
    Outcome.SUCCESS: (
        Candidate(_E.HAPPY),
        Candidate(_E.SMILING, 0.3, "energy", low=True),
        Candidate(_E.GRINNING, 0.3, "excitement"),
        Candidate(_E.WINKING_SMILE, 0.2, "affection"),
    ),
    Outcome.RAIN: (Candidate(_E.SAD),),
    Outcome.SUN: (Candidate(_E.HAPPY),),
    Outcome.ANSWER: (
        Candidate(_E.NORMAL),
        Candidate(_E.SMILING, 0.3, "joy"),
        Candidate(_E.FOCUSING, 0.3, "curiosity"),
    ),
    Outcome.NO_INTENT_MATCH: (
        Candidate(_E.PLEADING),
        Candidate(_E.WTF, 0.2, "irritation"),
    ),
    Outcome.NO_VALID_TARGETS: (
        Candidate(_E.PROBLEM),
        Candidate(_E.SWEATING, 0.2, "excitement"),
    ),
    Outcome.FAILED_TO_HANDLE: (
        Candidate(_E.SAD),
        Candidate(_E.HURT, 0.2, "irritation"),
    ),
    Outcome.OTHER_ERROR: (
        Candidate(_E.WTF),
        Candidate(_E.PROBLEM, 0.3),
    ),
}

_ERROR_OUTCOMES: Final = {
    intent.IntentResponseErrorCode.NO_VALID_TARGETS: Outcome.NO_VALID_TARGETS,
    intent.IntentResponseErrorCode.NO_INTENT_MATCH: Outcome.NO_INTENT_MATCH,
    intent.IntentResponseErrorCode.FAILED_TO_HANDLE: Outcome.FAILED_TO_HANDLE,
}
# The same command again within this time makes Casita cheeky
REPEAT_WINDOW: Final = timedelta(seconds=30)
# From this irritation, a plain success gets a deadpan face
ANNOYED_IRRITATION: Final = 0.6


@dataclass(frozen=True, slots=True)
class PreviousTurn:
    """The last reply, for variety and repeated commands."""

    emotion: Emotion
    time: datetime
    intent: str | None = None
    slots: dict[str, Any] | None = None


@dataclass(frozen=True, slots=True, kw_only=True)
class RuleContext:
    """What the rules know besides the response."""

    now: datetime
    temperature_unit: str = UnitOfTemperature.CELSIUS
    mood: Mapping[str, float] | None = None
    """Values of the mood variables, by name."""

    previous: PreviousTurn | None = None


def is_insult(text: str) -> bool:
    """Return if what the user said is an insult."""
    return _INSULT_WORDS.search(text) is not None


def emotion_from_user_text(text: str) -> Emotion | None:
    """Return the emotion for what the user said, if it calls for one.

    An insult wins over kind words: Casita does not smile at "merci, t'es nul".
    """
    if is_insult(text):
        return Emotion.SAD
    if _LOVE_WORDS.search(text):
        return Emotion.LOVING
    if _THANKS_WORDS.search(text):
        return Emotion.GRATEFUL
    return None


def pick_emotion(
    user_text: str,
    response: intent.IntentResponse,
    context: RuleContext,
    rng: random.Random | None = None,
) -> tuple[Emotion, EmotionOrigin]:
    """Return the emotion for a reply, and what picked it.

    What the user said wins, then the outcome of the response picks a set of
    expressions. Without a random generator, the usual one is picked.
    """
    if (emotion := emotion_from_user_text(user_text)) is not None:
        return emotion, EmotionOrigin.KEYWORD
    outcome = response_outcome(response, context)
    previous = context.previous.emotion if context.previous else None
    return draw(RULES[outcome], context.mood, previous, rng), EmotionOrigin.RULES


def emotion_from_rules(
    user_text: str,
    response: intent.IntentResponse,
    *,
    now: datetime,
    temperature_unit: str = UnitOfTemperature.CELSIUS,
) -> Emotion:
    """Return the usual emotion for a reply, without mood or history."""
    return pick_emotion(
        user_text,
        response,
        RuleContext(now=now, temperature_unit=temperature_unit),
    )[0]


def draw(
    candidates: tuple[Candidate, ...],
    mood: Mapping[str, float] | None,
    previous: Emotion | None,
    rng: random.Random | None,
) -> Emotion:
    """Draw an expression, weighted by the mood, not the previous one again."""
    if previous is not None and len(candidates) > 1:
        candidates = (
            tuple(
                candidate
                for candidate in candidates
                if candidate.emotion is not previous
            )
            or candidates
        )
    if rng is None or len(candidates) == 1:
        return candidates[0].emotion
    weights = [_weight(candidate, mood) for candidate in candidates]
    return rng.choices([candidate.emotion for candidate in candidates], weights)[0]


def _weight(candidate: Candidate, mood: Mapping[str, float] | None) -> float:
    if candidate.boost is None or mood is None:
        return candidate.weight
    value = mood.get(candidate.boost, 0.0)
    if candidate.boost == "joy":
        # Joy goes from -1 to 1
        value = (value + 1) / 2
    return candidate.weight + (1 - value if candidate.low else value)


def response_outcome(response: intent.IntentResponse, context: RuleContext) -> Outcome:
    """Return what happened, first match wins."""
    if response.response_type is intent.IntentResponseType.ERROR:
        if response.error_code is None:
            return Outcome.OTHER_ERROR
        return _ERROR_OUTCOMES.get(response.error_code, Outcome.OTHER_ERROR)
    if response.response_type is intent.IntentResponseType.QUERY_ANSWER:
        return _query_outcome(response)
    return _action_outcome(response, context)


def response_has_details(response: intent.IntentResponse) -> bool:
    """Return if a response says more than its speech: an error or targets."""
    return (
        response.response_type is intent.IntentResponseType.ERROR
        or bool(response.success_results)
        or bool(response.failed_results)
    )


def response_slots(response: intent.IntentResponse) -> dict[str, Any] | None:
    """Return the values of the slots of the intent of a response."""
    if response.intent is None:
        return None
    return {name: slot.get("value") for name, slot in response.intent.slots.items()}


def _speech(response: intent.IntentResponse) -> str:
    return str(response.speech.get("plain", {}).get("speech") or "")


def _query_outcome(response: intent.IntentResponse) -> Outcome:
    intent_type = response.intent.intent_type if response.intent else None
    weather_states = [
        state for state in response.matched_states if state.domain == "weather"
    ]
    if intent_type != _INTENT_GET_WEATHER and not weather_states:
        return Outcome.ANSWER
    conditions = {state.state for state in weather_states}
    if conditions & _RAINY_CONDITIONS:
        return Outcome.RAIN
    if conditions & _SUNNY_CONDITIONS:
        return Outcome.SUN
    speech = _speech(response)
    if _RAIN_WORDS.search(speech):
        return Outcome.RAIN
    if _SUN_WORDS.search(speech):
        return Outcome.SUN
    return Outcome.ANSWER


def _action_outcome(response: intent.IntentResponse, context: RuleContext) -> Outcome:
    if response.failed_results:
        if not response.success_results:
            return Outcome.ALL_FAILED
        return Outcome.PARTIAL_FAILURE

    intent_type = response.intent.intent_type if response.intent else None
    domains = {
        split_entity_id(target.id)[0]
        for target in response.success_results
        if target.type is intent.IntentResponseTargetType.ENTITY
        and target.id is not None
        and valid_entity_id(target.id)
    }
    now = context.now

    if intent_type == _INTENT_CLIMATE_SET_TEMPERATURE and _is_hot(
        response, context.temperature_unit
    ):
        return Outcome.HOT
    if intent_type == intent.INTENT_TURN_OFF and _is_late_night(now):
        return Outcome.LATE_NIGHT_OFF
    if _is_closing(intent_type, domains, response):
        return Outcome.CLOSED
    if intent_type == intent.INTENT_TURN_ON and "light" in domains and _is_evening(now):
        return Outcome.EVENING_LIGHT
    if (
        (previous := context.previous) is not None
        and intent_type is not None
        and previous.intent == intent_type
        and previous.slots == response_slots(response)
        and timedelta(0) <= now - previous.time <= REPEAT_WINDOW
    ):
        return Outcome.REPEATED
    if context.mood and context.mood.get("irritation", 0.0) >= ANNOYED_IRRITATION:
        return Outcome.ANNOYED
    return Outcome.SUCCESS


def _is_closing(
    intent_type: str | None, domains: set[str], response: intent.IntentResponse
) -> bool:
    """Return if covers were closed or locks locked."""
    if intent_type == intent.INTENT_TURN_OFF and "cover" in domains:
        return True
    if intent_type == intent.INTENT_TURN_ON and "lock" in domains:
        return True
    return (
        intent_type == intent.INTENT_SET_POSITION
        and "cover" in domains
        and _slot_number(response, "position") == 0
    )


def _is_hot(response: intent.IntentResponse, temperature_unit: str) -> bool:
    if (temperature := _slot_number(response, "temperature")) is None:
        return False
    threshold = TemperatureConverter.convert(
        _HOT_TEMPERATURE, UnitOfTemperature.CELSIUS, temperature_unit
    )
    return temperature >= threshold


def _slot_number(response: intent.IntentResponse, slot: str) -> float | None:
    if response.intent is None:
        return None
    value = response.intent.slots.get(slot, {}).get("value")
    try:
        return float(value)
    except TypeError, ValueError:
        return None


def _is_evening(now: datetime) -> bool:
    return _EVENING_START <= now.time() < _LATE_NIGHT_START


def _is_late_night(now: datetime) -> bool:
    current = now.time()
    return current >= _LATE_NIGHT_START or current < _LATE_NIGHT_END

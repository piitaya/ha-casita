"""Tests for the mood of Casita."""

from datetime import timedelta
from typing import Any

from freezegun.api import FrozenDateTimeFactory
import pytest
from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    async_fire_time_changed,
)

from custom_components.casita.const import CONF_LLM_AGENT, CONF_WEATHER_ENTITY, DOMAIN
from custom_components.casita.mood import (
    Interaction,
    MoodVariable,
    describe_mood,
    energy_baseline,
    interaction_delta,
)
from homeassistant.components import conversation
from homeassistant.core import Context, HomeAssistant
from homeassistant.util import dt as dt_util

from .conftest import LLM_AGENT_ID, FakeLLMAgent

ENTRY_ID = "casita_entry"
STORAGE_KEY = f"{DOMAIN}.{ENTRY_ID}.mood"
NOON = "2026-11-06T12:00:00+01:00"
NIGHT = "2026-11-06T23:30:00+01:00"


@pytest.fixture
async def mood_entry(
    hass: HomeAssistant,
    setup_ha: None,
    freezer: FrozenDateTimeFactory,
    options: dict[str, Any],
    stored_mood: dict[str, float] | None,
    start_time: str,
    hass_storage: dict[str, Any],
) -> MockConfigEntry:
    """Set up Casita at a given time, with a saved mood."""
    await hass.config.async_set_time_zone("Europe/Paris")
    freezer.move_to(start_time)
    if stored_mood is not None:
        hass_storage[STORAGE_KEY] = {
            "version": 1,
            "minor_version": 1,
            "key": STORAGE_KEY,
            "data": {
                "values": stored_mood,
                "updated": dt_util.utcnow().isoformat(),
            },
        }
    entry = MockConfigEntry(
        domain=DOMAIN, title="Casita", options=options, entry_id=ENTRY_ID
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


@pytest.fixture
def options() -> dict[str, Any]:
    """Return the options of the config entry, local only by default."""
    return {}


@pytest.fixture
def stored_mood() -> dict[str, float] | None:
    """Return the saved mood."""
    return None


@pytest.fixture
def start_time() -> str:
    """Return when Casita starts."""
    return NOON


def _mood(hass: HomeAssistant, variable: str) -> tuple[float, float]:
    state = hass.states.get(f"sensor.casita_{variable}")
    assert state is not None
    return float(state.state), state.attributes["baseline"]


async def _wait(
    hass: HomeAssistant, freezer: FrozenDateTimeFactory, seconds: float
) -> None:
    freezer.tick(timedelta(seconds=seconds))
    async_fire_time_changed(hass)
    await hass.async_block_till_done()


@pytest.mark.usefixtures("mood_entry")
async def test_baselines(hass: HomeAssistant) -> None:
    """Test a new Casita starts at the baselines of noon."""
    assert _mood(hass, "joy") == (0.28, 0.28)
    assert _mood(hass, "excitement") == (0.35, 0.35)
    assert _mood(hass, "energy") == (0.7, 0.7)
    assert _mood(hass, "affection") == (0.3, 0.3)
    assert _mood(hass, "irritation") == (0.0, 0.0)
    assert _mood(hass, "curiosity") == (0.3, 0.3)
    state = hass.states.get("sensor.casita_joy")
    assert state is not None
    assert state.attributes["state_class"] == "measurement"
    assert "unit_of_measurement" not in state.attributes


@pytest.mark.usefixtures("mood_entry")
async def test_decay(hass: HomeAssistant, freezer: FrozenDateTimeFactory) -> None:
    """Test the mood drifts back to its baselines, checked every 30 seconds."""
    await hass.services.async_call(
        DOMAIN, "interact", {"kind": "shake", "intensity": 0.5}, blocking=True
    )
    assert _mood(hass, "joy")[0] == 0.03
    assert _mood(hass, "excitement")[0] == 0.75
    assert _mood(hass, "irritation")[0] == 0.35
    assert _mood(hass, "affection")[0] == 0.25

    await _wait(hass, freezer, 30)
    # Irritation has a time constant of 8 s, excitement 12 s, joy 40 s
    assert _mood(hass, "irritation")[0] == 0.01
    assert _mood(hass, "excitement")[0] == 0.38
    # Toward 0.275, the baseline with less affection
    assert _mood(hass, "joy")[0] == 0.16
    # Affection only moves by 0.01 a day
    assert _mood(hass, "affection")[0] == 0.25

    await _wait(hass, freezer, 600)
    joy, joy_baseline = _mood(hass, "joy")
    assert joy == joy_baseline
    assert _mood(hass, "irritation")[0] == 0.0


@pytest.mark.parametrize(
    ("kind", "intensity", "expected"),
    [
        ("pet", 0.5, {"joy": 0.12, "excitement": -0.05, "affection": 0.05}),
        ("pet", 1.0, {"joy": 0.24, "excitement": -0.1, "affection": 0.1}),
        ("poke", 0.5, {"joy": 0.03, "excitement": 0.2, "irritation": 0.08}),
        # Above the default intensity, rapid pokes are added
        ("poke", 1.0, {"joy": -0.02, "excitement": 0.35, "irritation": 0.26}),
        ("tickle", 0.25, {"joy": 0.075, "energy": -0.015}),
        ("ignore", 0.5, {"joy": -0.1}),
    ],
)
def test_interaction_delta(
    kind: str, intensity: float, expected: dict[str, float]
) -> None:
    """Test the deltas of interactions scale with the intensity."""
    delta = interaction_delta(Interaction(kind), intensity)
    for variable, value in expected.items():
        assert delta[MoodVariable(variable)] == pytest.approx(value)


@pytest.mark.parametrize(
    ("hour", "expected"),
    [(6, 0.25), (7, 0.8), (12, 0.7), (19, 0.5), (22, 0.25), (0, 0.25)],
)
def test_energy_baseline(hour: int, expected: float) -> None:
    """Test the energy baseline follows the hour."""
    assert energy_baseline(hour) == expected


@pytest.mark.parametrize("options", [{CONF_LLM_AGENT: LLM_AGENT_ID}])
@pytest.mark.usefixtures("mood_entry")
async def test_conversation_inputs(
    hass: HomeAssistant, llm_agent: FakeLLMAgent
) -> None:
    """Test replies move the mood."""
    llm_agent.reply = "[emotion:Owls] Owls are birds."
    await conversation.async_converse(
        hass,
        "tell me about owls",
        None,
        Context(),
        language="en",
        agent_id="conversation.casita",
    )
    # Any conversation: a bit more excited and curious
    assert _mood(hass, "excitement")[0] == 0.45
    assert _mood(hass, "curiosity")[0] == 0.45
    assert _mood(hass, "affection")[0] == 0.31

    llm_agent.reply = "[emotion:Loving] Love you too!"
    await conversation.async_converse(
        hass,
        "I love you",
        None,
        Context(),
        language="en",
        agent_id="conversation.casita",
    )
    assert _mood(hass, "affection")[0] == 0.35
    assert _mood(hass, "joy")[0] == 0.58

    llm_agent.reply = "[emotion:Sad] That hurts."
    await conversation.async_converse(
        hass,
        "you are useless",
        None,
        Context(),
        language="en",
        agent_id="conversation.casita",
    )
    assert _mood(hass, "irritation")[0] == 0.3
    assert _mood(hass, "joy")[0] == 0.43


@pytest.mark.usefixtures("mood_entry")
async def test_error_input(hass: HomeAssistant) -> None:
    """Test a reply with an error annoys Casita a bit."""
    await conversation.async_converse(
        hass,
        "blah blah blah",
        None,
        Context(),
        language="en",
        agent_id="conversation.casita",
    )
    assert _mood(hass, "irritation")[0] == 0.1


@pytest.mark.usefixtures("mood_entry")
async def test_person_arrives_home(hass: HomeAssistant) -> None:
    """Test someone arriving home cheers Casita up."""
    hass.states.async_set("person.paul", "not_home")
    await hass.async_block_till_done()
    assert _mood(hass, "joy")[0] == 0.28

    hass.states.async_set("person.paul", "home")
    await hass.async_block_till_done()
    assert _mood(hass, "joy")[0] == 0.48
    assert _mood(hass, "excitement")[0] == 0.65

    # Coming back from unknown is a restart, not an arrival
    hass.states.async_set("person.marina", "unknown")
    hass.states.async_set("person.marina", "home")
    await hass.async_block_till_done()
    assert _mood(hass, "excitement")[0] == 0.65


@pytest.mark.parametrize("start_time", [NIGHT])
@pytest.mark.parametrize("stored_mood", [{"energy": 0.8}])
@pytest.mark.parametrize(
    ("sun", "expected"),
    [("below_horizon", 0.45), ("above_horizon", 0.58)],
)
@pytest.mark.usefixtures("mood_entry")
async def test_night(
    hass: HomeAssistant, freezer: FrozenDateTimeFactory, sun: str, expected: float
) -> None:
    """Test energy drops twice as fast late at night with the sun down."""
    hass.states.async_set("sun.sun", sun)
    assert _mood(hass, "energy") == (0.8, 0.25)

    await _wait(hass, freezer, 60)

    assert _mood(hass, "energy")[0] == expected


@pytest.mark.parametrize("options", [{CONF_WEATHER_ENTITY: "weather.home"}])
@pytest.mark.usefixtures("mood_entry")
async def test_rain(hass: HomeAssistant, freezer: FrozenDateTimeFactory) -> None:
    """Test rain on the weather entity lowers the joy baseline."""
    hass.states.async_set("weather.home", "rainy")
    await _wait(hass, freezer, 30)
    assert _mood(hass, "joy")[1] == 0.18

    await _wait(hass, freezer, 600)
    assert _mood(hass, "joy") == (0.18, 0.18)

    hass.states.async_set("weather.home", "sunny")
    await _wait(hass, freezer, 30)
    assert _mood(hass, "joy")[1] == 0.28


@pytest.mark.parametrize(
    "stored_mood",
    [{"joy": 0.9, "affection": 0.9, "irritation": 2.0, "energy": "tired"}],
)
@pytest.mark.usefixtures("mood_entry")
async def test_load_saved_mood(hass: HomeAssistant) -> None:
    """Test the saved mood is loaded, with invalid values fixed."""
    assert _mood(hass, "joy") == (0.9, 0.34)
    assert _mood(hass, "affection") == (0.9, 0.3)
    assert _mood(hass, "irritation")[0] == 1.0
    assert _mood(hass, "energy")[0] == 0.7


async def test_persistence(
    hass: HomeAssistant,
    mood_entry: MockConfigEntry,
    freezer: FrozenDateTimeFactory,
    hass_storage: dict[str, Any],
) -> None:
    """Test the mood is saved after a delay and on unload, and decays meanwhile."""
    await hass.services.async_call(
        DOMAIN, "interact", {"kind": "hug", "intensity": 1}, blocking=True
    )
    assert _mood(hass, "affection")[0] == 0.38
    assert STORAGE_KEY not in hass_storage

    await _wait(hass, freezer, 31)
    saved = hass_storage[STORAGE_KEY]["data"]
    assert saved["values"]["affection"] == pytest.approx(0.38, abs=1e-3)

    await hass.services.async_call(
        DOMAIN, "interact", {"kind": "hug", "intensity": 1}, blocking=True
    )
    assert await hass.config_entries.async_unload(mood_entry.entry_id)
    await hass.async_block_till_done()
    saved = hass_storage[STORAGE_KEY]["data"]
    assert saved["values"]["affection"] == pytest.approx(0.46, abs=1e-3)

    # Two days later
    freezer.tick(timedelta(days=2))
    assert await hass.config_entries.async_setup(mood_entry.entry_id)
    await hass.async_block_till_done()
    assert _mood(hass, "affection")[0] == 0.44
    assert _mood(hass, "joy")[0] == _mood(hass, "joy")[1]

    # Removing the entry removes the saved mood
    assert await hass.config_entries.async_remove(mood_entry.entry_id)
    await hass.async_block_till_done()
    assert STORAGE_KEY not in hass_storage


def test_describe_mood() -> None:
    """Test the mood line of the persona, in English and French."""
    values = {
        MoodVariable.JOY: 0.3,
        MoodVariable.EXCITEMENT: 0.35,
        MoodVariable.ENERGY: 0.3,
        MoodVariable.AFFECTION: 0.8,
        MoodVariable.IRRITATION: 0.0,
        MoodVariable.CURIOSITY: 0.3,
    }
    assert describe_mood(values, "fr") == (
        "Ton humeur du moment : un peu fatigué et très affectueux. "
        "Laisse-la transparaître sans en parler."
    )
    assert describe_mood(values, "en") == (
        "Your mood right now: a bit tired and very affectionate. "
        "Let it show without talking about it."
    )
    values[MoodVariable.ENERGY] = 0.7
    values[MoodVariable.AFFECTION] = 0.3
    assert describe_mood(values, "en") == (
        "Your mood right now: calm and content. Let it show without talking about it."
    )
    values |= {
        MoodVariable.IRRITATION: 0.7,
        MoodVariable.JOY: -0.5,
        MoodVariable.CURIOSITY: 0.9,
        MoodVariable.EXCITEMENT: 0.9,
    }
    # The three strongest
    assert describe_mood(values, "fr") == (
        "Ton humeur du moment : très curieux, surexcité et triste. "
        "Laisse-la transparaître sans en parler."
    )


@pytest.mark.parametrize("options", [{CONF_LLM_AGENT: LLM_AGENT_ID}])
@pytest.mark.parametrize("stored_mood", [{"energy": 0.1, "affection": 0.9}])
@pytest.mark.usefixtures("mood_entry")
async def test_persona_has_mood(hass: HomeAssistant, llm_agent: FakeLLMAgent) -> None:
    """Test the mood is in the prompt of the LLM, in the conversation language."""
    await conversation.async_converse(
        hass,
        "raconte-moi une blague",
        None,
        Context(),
        language="fr-FR",
        agent_id="conversation.casita",
    )
    prompt = llm_agent.inputs[0].extra_system_prompt
    assert prompt is not None
    assert prompt.startswith("Tu es Casita")
    assert "Ton humeur du moment : très affectueux et très fatigué." in prompt

    await conversation.async_converse(
        hass,
        "tell me a joke",
        None,
        Context(),
        language="en",
        agent_id="conversation.casita",
    )
    prompt = llm_agent.inputs[1].extra_system_prompt
    assert prompt is not None
    assert prompt.startswith("You are Casita")
    assert "Your mood right now: very affectionate and very tired." in prompt

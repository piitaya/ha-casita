"""Tests for the actions and the websocket command of Casita."""

import json
from pathlib import Path
from typing import Any

import probatio
import pytest
from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    async_capture_events,
)
from pytest_homeassistant_custom_component.typing import WebSocketGenerator

from custom_components.casita.const import (
    CONF_LLM_AGENT,
    CONF_WEATHER_ENTITY,
    DOMAIN,
    EVENT_CASITA_EMOTION,
)
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import device_registry as dr

DIAGNOSTIC_KEYS = (
    "last_path",
    "last_local_result",
    "last_restyle",
    "last_duration",
    "last_local_duration",
    "last_llm_duration",
    "last_ai_task_duration",
    "last_original_text",
)

VERSION = json.loads(
    (Path(__file__).parents[1] / "custom_components/casita/manifest.json").read_text()
)["version"]


@pytest.fixture
def options() -> dict[str, Any]:
    """Return the options of the config entries."""
    return {}


@pytest.fixture
async def second_entry(
    hass: HomeAssistant, config_entry: MockConfigEntry
) -> MockConfigEntry:
    """Set up a second Casita."""
    entry = MockConfigEntry(domain=DOMAIN, title="Casita bis", options={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


def _value(hass: HomeAssistant, entity_id: str) -> str:
    state = hass.states.get(entity_id)
    assert state is not None
    return state.state


@pytest.mark.usefixtures("config_entry")
async def test_set_emotion(hass: HomeAssistant) -> None:
    """Test setting the emotion by hand."""
    events = async_capture_events(hass, EVENT_CASITA_EMOTION)
    await hass.services.async_call(
        DOMAIN, "set_emotion", {"emotion": "Silly"}, blocking=True
    )

    state = hass.states.get("sensor.casita_emotion")
    assert state is not None
    assert state.state == "Silly"
    assert state.attributes["source"] == "manual"
    assert state.attributes["text"] is None
    assert state.attributes["path"] is None
    assert len(events) == 1
    assert events[0].data["emotion"] == "Silly"
    assert events[0].data["source"] == "manual"
    assert events[0].data["emotion_source"] is None
    # An emotion set by hand is not a reply
    assert _value(hass, "sensor.casita_last_path") == "unknown"


@pytest.mark.usefixtures("config_entry")
@pytest.mark.parametrize(
    ("service", "data"),
    [
        ("set_emotion", {"emotion": "Banana"}),
        ("set_emotion", {"emotion": "happy"}),
        ("set_emotion", {}),
        ("interact", {"kind": "kiss"}),
        ("interact", {"kind": "pet", "intensity": 1.5}),
        ("interact", {"kind": "pet", "intensity": -0.1}),
        ("interact", {"kind": "pet", "intensity": "a lot"}),
        ("interact", {}),
    ],
)
async def test_invalid_data(
    hass: HomeAssistant, service: str, data: dict[str, Any]
) -> None:
    """Test the data of the actions is validated."""
    with pytest.raises(probatio.Invalid):
        await hass.services.async_call(DOMAIN, service, data, blocking=True)


@pytest.mark.usefixtures("config_entry")
async def test_interact(hass: HomeAssistant) -> None:
    """Test an interaction moves the mood, with the default intensity."""
    await hass.services.async_call(DOMAIN, "interact", {"kind": "pet"}, blocking=True)
    assert _value(hass, "sensor.casita_affection") == "0.35"
    assert _value(hass, "sensor.casita_joy") == "0.4"


async def test_actions_on_entries(
    hass: HomeAssistant,
    config_entry: MockConfigEntry,
    second_entry: MockConfigEntry,
    device_registry: dr.DeviceRegistry,
) -> None:
    """Test actions apply to every Casita, or to the one picked."""
    await hass.services.async_call(
        DOMAIN, "set_emotion", {"emotion": "Happy"}, blocking=True
    )
    assert _value(hass, "sensor.casita_emotion") == "Happy"
    assert _value(hass, "sensor.casita_bis_emotion") == "Happy"

    await hass.services.async_call(
        DOMAIN,
        "set_emotion",
        {"emotion": "Sad", "entry_id": second_entry.entry_id},
        blocking=True,
    )
    assert _value(hass, "sensor.casita_emotion") == "Happy"
    assert _value(hass, "sensor.casita_bis_emotion") == "Sad"

    # Targeting the device or an entity of a Casita
    [device] = dr.async_entries_for_config_entry(device_registry, config_entry.entry_id)
    await hass.services.async_call(
        DOMAIN,
        "set_emotion",
        {"emotion": "Silly", "device_id": device.id},
        blocking=True,
    )
    assert _value(hass, "sensor.casita_emotion") == "Silly"
    assert _value(hass, "sensor.casita_bis_emotion") == "Sad"
    await hass.services.async_call(
        DOMAIN,
        "interact",
        {"kind": "hug", "entity_id": "conversation.casita_bis"},
        blocking=True,
    )
    assert _value(hass, "sensor.casita_affection") == "0.3"
    assert _value(hass, "sensor.casita_bis_affection") == "0.34"

    with pytest.raises(ServiceValidationError) as err:
        await hass.services.async_call(
            DOMAIN,
            "set_emotion",
            {"emotion": "Sad", "entry_id": "missing"},
            blocking=True,
        )
    assert err.value.translation_key == "entry_not_loaded"

    hass.states.async_set("light.desk", "on")
    with pytest.raises(ServiceValidationError) as err:
        await hass.services.async_call(
            DOMAIN,
            "set_emotion",
            {"emotion": "Sad", "entity_id": "light.desk"},
            blocking=True,
        )
    assert err.value.translation_key == "not_a_casita"


async def test_actions_without_casita(
    hass: HomeAssistant, config_entry: MockConfigEntry
) -> None:
    """Test the actions say when no Casita is loaded."""
    assert await hass.config_entries.async_unload(config_entry.entry_id)
    with pytest.raises(ServiceValidationError) as err:
        await hass.services.async_call(
            DOMAIN, "interact", {"kind": "pet"}, blocking=True
        )
    assert err.value.translation_key == "not_loaded"


async def test_websocket_info(
    hass: HomeAssistant,
    hass_ws_client: WebSocketGenerator,
    config_entry: MockConfigEntry,
    second_entry: MockConfigEntry,
) -> None:
    """Test the panel gets every Casita with its entities."""
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "casita/info"})
    msg = await client.receive_json()

    assert msg["success"]
    result = msg["result"]
    assert result["version"] == VERSION
    assert result["entries"] == [
        {
            "entry_id": config_entry.entry_id,
            "title": "Casita",
            "conversation_entity": "conversation.casita",
            "emotion_entity": "sensor.casita_emotion",
            "mood_entities": {
                variable: f"sensor.casita_{variable}"
                for variable in (
                    "joy",
                    "excitement",
                    "energy",
                    "affection",
                    "irritation",
                    "curiosity",
                )
            },
            "diagnostic_entities": {
                "last_path": "sensor.casita_last_path",
                "last_local_result": "sensor.casita_last_local_result",
                "last_restyle": "sensor.casita_last_restyle",
                "last_duration": "sensor.casita_last_reply_duration",
                "last_local_duration": "sensor.casita_last_local_duration",
                "last_llm_duration": "sensor.casita_last_llm_duration",
                "last_ai_task_duration": "sensor.casita_last_ai_task_duration",
                "last_original_text": "sensor.casita_last_original_text",
            },
            "llm_agent": None,
            "weather_entity": None,
        },
        {
            "entry_id": second_entry.entry_id,
            "title": "Casita bis",
            "conversation_entity": "conversation.casita_bis",
            "emotion_entity": "sensor.casita_bis_emotion",
            "mood_entities": result["entries"][1]["mood_entities"],
            "diagnostic_entities": result["entries"][1]["diagnostic_entities"],
            "llm_agent": None,
            "weather_entity": None,
        },
    ]
    assert set(result["entries"][1]["diagnostic_entities"]) == set(DIAGNOSTIC_KEYS)

    # Unloaded entries are left out
    assert await hass.config_entries.async_unload(config_entry.entry_id)
    await client.send_json_auto_id({"type": "casita/info"})
    msg = await client.receive_json()
    assert [entry["entry_id"] for entry in msg["result"]["entries"]] == [
        second_entry.entry_id
    ]


async def test_websocket_info_weather_entity(
    hass: HomeAssistant,
    hass_ws_client: WebSocketGenerator,
    setup_ha: None,
) -> None:
    """Test the panel gets the LLM agent and the weather entity of the options."""
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Casita",
        options={
            CONF_LLM_AGENT: "conversation.fake_llm",
            CONF_WEATHER_ENTITY: "weather.home",
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "casita/info"})
    msg = await client.receive_json()
    assert msg["success"]
    assert msg["result"]["entries"][0]["weather_entity"] == "weather.home"
    assert msg["result"]["entries"][0]["llm_agent"] == "conversation.fake_llm"


async def test_websocket_info_read_only_user(
    hass: HomeAssistant,
    hass_ws_client: WebSocketGenerator,
    hass_read_only_access_token: str,
    config_entry: MockConfigEntry,
) -> None:
    """Test any authenticated user can get the info."""
    client = await hass_ws_client(hass, hass_read_only_access_token)
    await client.send_json_auto_id({"type": "casita/info"})
    msg = await client.receive_json()
    assert msg["success"]
    assert len(msg["result"]["entries"]) == 1

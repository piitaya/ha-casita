"""Websocket commands of Casita, for the panel."""

from typing import Any

import probatio

from homeassistant.components import conversation, websocket_api
from homeassistant.components.sensor import DOMAIN as SENSOR_DOMAIN
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er
from homeassistant.loader import async_get_loaded_integration

from .const import CONF_LLM_AGENT, CONF_WEATHER_ENTITY, DOMAIN
from .models import CasitaConfigEntry
from .mood import MoodVariable
from .sensor import REPLY_SENSORS, emotion_unique_id, mood_unique_id, reply_unique_id


@callback
def async_setup_websocket_api(hass: HomeAssistant) -> None:
    """Register the websocket commands."""
    websocket_api.async_register_command(hass, websocket_info)


@callback
def _async_entry_info(
    entity_registry: er.EntityRegistry, entry: CasitaConfigEntry
) -> dict[str, Any]:
    """Return an entry with the ids of its entities."""
    entry_id = entry.entry_id

    def sensor(unique_id: str) -> str | None:
        return entity_registry.async_get_entity_id(SENSOR_DOMAIN, DOMAIN, unique_id)

    return {
        "entry_id": entry_id,
        "title": entry.title,
        "conversation_entity": entity_registry.async_get_entity_id(
            conversation.DOMAIN, DOMAIN, entry_id
        ),
        "emotion_entity": sensor(emotion_unique_id(entry_id)),
        "mood_entities": {
            variable.value: sensor(mood_unique_id(entry_id, variable))
            for variable in MoodVariable
        },
        "diagnostic_entities": {
            description.key: sensor(reply_unique_id(entry_id, description.key))
            for description in REPLY_SENSORS
        },
        # Options the panel uses: the agent tells entries with the same title apart,
        # the weather entity is shown through the window of the room
        "llm_agent": entry.options.get(CONF_LLM_AGENT) or None,
        "weather_entity": entry.options.get(CONF_WEATHER_ENTITY) or None,
    }


@websocket_api.websocket_command({probatio.Required("type"): "casita/info"})
@callback
def websocket_info(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return the loaded Casitas and their entities.

    Entity ids depend on the language of the system, so the panel asks for them.
    """
    entity_registry = er.async_get(hass)
    entries: list[CasitaConfigEntry] = hass.config_entries.async_loaded_entries(DOMAIN)
    connection.send_result(
        msg["id"],
        {
            "version": str(async_get_loaded_integration(hass, DOMAIN).version),
            "entries": [_async_entry_info(entity_registry, entry) for entry in entries],
        },
    )

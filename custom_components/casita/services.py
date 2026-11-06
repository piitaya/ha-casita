"""Actions of Casita."""

from typing import Final

import probatio

from homeassistant.const import (
    ATTR_AREA_ID,
    ATTR_DEVICE_ID,
    ATTR_ENTITY_ID,
    ATTR_FLOOR_ID,
    ATTR_LABEL_ID,
)
from homeassistant.core import HomeAssistant, ServiceCall, callback
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv, service
from homeassistant.util import dt as dt_util

from .const import (
    ATTR_EMOTION,
    ATTR_ENTRY_ID,
    ATTR_INTENSITY,
    ATTR_KIND,
    DOMAIN,
    SERVICE_INTERACT,
    SERVICE_SET_EMOTION,
)
from .emotion import (
    EMOTIONS,
    Emotion,
    EmotionSource,
    EmotionUpdate,
    async_publish_emotion,
)
from .models import CasitaConfigEntry
from .mood import DEFAULT_INTENSITY, INTERACTIONS, Interaction

_TARGET_KEYS: Final = (
    ATTR_ENTITY_ID,
    ATTR_DEVICE_ID,
    ATTR_AREA_ID,
    ATTR_FLOOR_ID,
    ATTR_LABEL_ID,
)

INTERACT_SCHEMA = probatio.Schema(
    {
        probatio.Required(ATTR_KIND): probatio.In(INTERACTIONS),
        probatio.Optional(ATTR_INTENSITY, default=DEFAULT_INTENSITY): probatio.All(
            probatio.Coerce(float), probatio.Range(min=0, max=1)
        ),
        probatio.Optional(ATTR_ENTRY_ID): cv.string,
        **cv.ENTITY_SERVICE_FIELDS,
    }
)
SET_EMOTION_SCHEMA = probatio.Schema(
    {
        probatio.Required(ATTR_EMOTION): probatio.In(EMOTIONS),
        probatio.Optional(ATTR_ENTRY_ID): cv.string,
        **cv.ENTITY_SERVICE_FIELDS,
    }
)


async def _async_get_entries(call: ServiceCall) -> list[CasitaConfigEntry]:
    """Return the entries an action applies to.

    An entry id or a target picks entries, without them the action applies to
    every Casita.
    """
    loaded: list[CasitaConfigEntry] = call.hass.config_entries.async_loaded_entries(
        DOMAIN
    )
    if (entry_id := call.data.get(ATTR_ENTRY_ID)) is not None:
        if not (entries := [entry for entry in loaded if entry.entry_id == entry_id]):
            raise ServiceValidationError(
                translation_domain=DOMAIN,
                translation_key="entry_not_loaded",
                translation_placeholders={"entry_id": entry_id},
            )
        return entries
    if any(key in call.data for key in _TARGET_KEYS):
        entry_ids = await service.async_extract_config_entry_ids(call)
        if not (entries := [entry for entry in loaded if entry.entry_id in entry_ids]):
            raise ServiceValidationError(
                translation_domain=DOMAIN, translation_key="not_a_casita"
            )
        return entries
    if not loaded:
        raise ServiceValidationError(
            translation_domain=DOMAIN, translation_key="not_loaded"
        )
    return loaded


async def _async_interact(call: ServiceCall) -> None:
    """Let an interaction from the panel move the mood."""
    kind = Interaction(call.data[ATTR_KIND])
    for entry in await _async_get_entries(call):
        entry.runtime_data.mood.async_interact(kind, call.data[ATTR_INTENSITY])


async def _async_set_emotion(call: ServiceCall) -> None:
    """Show an emotion, like a reply would."""
    update = EmotionUpdate(
        emotion=Emotion(call.data[ATTR_EMOTION]),
        source=EmotionSource.MANUAL,
        text=None,
        agent_id=None,
        conversation_id=None,
        device_id=None,
        updated=dt_util.utcnow(),
    )
    for entry in await _async_get_entries(call):
        async_publish_emotion(call.hass, entry.entry_id, update, call.context)


@callback
def async_setup_services(hass: HomeAssistant) -> None:
    """Register the actions of Casita."""
    hass.services.async_register(
        DOMAIN, SERVICE_INTERACT, _async_interact, schema=INTERACT_SCHEMA
    )
    hass.services.async_register(
        DOMAIN, SERVICE_SET_EMOTION, _async_set_emotion, schema=SET_EMOTION_SCHEMA
    )

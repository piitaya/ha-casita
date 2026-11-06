"""Sensors of Casita: emotion, mood and details of the last reply."""

from collections.abc import Callable
from dataclasses import dataclass
from typing import Any, override

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorEntityDescription,
    SensorStateClass,
)
from homeassistant.const import EntityCategory, UnitOfTime
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback
from homeassistant.helpers.typing import StateType

from .const import (
    ATTR_AGENT_ID,
    ATTR_BASELINE,
    ATTR_CONVERSATION_ID,
    ATTR_DEVICE_ID,
    ATTR_PATH,
    ATTR_RESTYLE,
    ATTR_SOURCE,
    ATTR_TEXT,
    ATTR_TIMINGS_MS,
    ATTR_UPDATED,
    SIGNAL_EMOTION_UPDATED,
    SIGNAL_MOOD_UPDATED,
)
from .emotion import (
    EMOTIONS,
    Emotion,
    EmotionUpdate,
    LocalResult,
    ReplyDetails,
    ReplyPath,
    RestyleResult,
)
from .entity import CasitaEntity
from .models import CasitaConfigEntry
from .mood import MoodValue, MoodVariable

PARALLEL_UPDATES = 0

# Longest state Home Assistant accepts
MAX_STATE_LENGTH = 255

_EMOTION_ATTRIBUTES = (
    ATTR_SOURCE,
    ATTR_TEXT,
    ATTR_AGENT_ID,
    ATTR_CONVERSATION_ID,
    ATTR_DEVICE_ID,
    ATTR_UPDATED,
    ATTR_PATH,
    ATTR_RESTYLE,
    ATTR_TIMINGS_MS,
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: CasitaConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up the sensors."""
    async_add_entities(
        [
            CasitaEmotionSensor(entry),
            *(CasitaMoodSensor(entry, variable) for variable in MoodVariable),
            *(CasitaReplySensor(entry, description) for description in REPLY_SENSORS),
        ]
    )


def emotion_unique_id(entry_id: str) -> str:
    """Return the unique id of the emotion sensor."""
    return f"{entry_id}_emotion"


def mood_unique_id(entry_id: str, variable: MoodVariable) -> str:
    """Return the unique id of a mood sensor."""
    return f"{entry_id}_{variable}"


def reply_unique_id(entry_id: str, key: str) -> str:
    """Return the unique id of a sensor showing a detail of the last reply."""
    return f"{entry_id}_{key}"


class CasitaEmotionSensor(CasitaEntity, SensorEntity):
    """Emotion of the last reply of Casita."""

    _attr_translation_key = "emotion"
    _attr_device_class = SensorDeviceClass.ENUM
    _attr_native_value = Emotion.NORMAL.value
    # Conversation content, ids and timings change on every reply, keep them
    # out of history
    _unrecorded_attributes = frozenset(
        {ATTR_TEXT, ATTR_CONVERSATION_ID, ATTR_DEVICE_ID, ATTR_UPDATED, ATTR_TIMINGS_MS}
    )

    def __init__(self, entry: CasitaConfigEntry) -> None:
        """Initialize the sensor."""
        super().__init__(entry, emotion_unique_id(entry.entry_id))
        self._attr_options = list(EMOTIONS)
        self._update: EmotionUpdate | None = None

    @property
    @override
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return details of the last reply."""
        if (update := self._update) is None:
            return dict.fromkeys(_EMOTION_ATTRIBUTES)
        attributes = update.as_dict()
        del attributes["emotion"]
        return attributes

    @override
    async def async_added_to_hass(self) -> None:
        """Listen to emotion updates."""
        await super().async_added_to_hass()
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass,
                SIGNAL_EMOTION_UPDATED.format(self._entry.entry_id),
                self._async_handle_update,
            )
        )

    @callback
    def _async_handle_update(self, update: EmotionUpdate) -> None:
        """Show the emotion of the last reply."""
        self._update = update
        self._attr_native_value = update.emotion.value
        self.async_write_ha_state()


class CasitaMoodSensor(CasitaEntity, SensorEntity):
    """A variable of the mood of Casita."""

    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_suggested_display_precision = 2

    def __init__(self, entry: CasitaConfigEntry, variable: MoodVariable) -> None:
        """Initialize the sensor."""
        super().__init__(entry, mood_unique_id(entry.entry_id, variable))
        self._variable = variable
        self._attr_translation_key = variable.value
        self._mood_value: MoodValue | None = None

    @override
    async def async_added_to_hass(self) -> None:
        """Listen to mood updates."""
        await super().async_added_to_hass()
        self._mood_value = self._entry.runtime_data.mood.values[self._variable]
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass,
                SIGNAL_MOOD_UPDATED.format(self._entry.entry_id),
                self._async_handle_update,
            )
        )

    @property
    @override
    def native_value(self) -> float | None:
        """Return the value, rounded to 2 decimals."""
        return None if self._mood_value is None else self._mood_value.value

    @property
    @override
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return the baseline the value drifts back to."""
        return {
            ATTR_BASELINE: None
            if self._mood_value is None
            else self._mood_value.baseline
        }

    @callback
    def _async_handle_update(self) -> None:
        """Write the state when the value or the baseline changed."""
        mood_value = self._entry.runtime_data.mood.values[self._variable]
        if mood_value == self._mood_value:
            return
        self._mood_value = mood_value
        self.async_write_ha_state()


@dataclass(frozen=True, kw_only=True)
class CasitaReplySensorDescription(SensorEntityDescription):
    """Describes a sensor showing a detail of the last reply."""

    value_fn: Callable[[ReplyDetails], StateType]
    attributes_fn: Callable[[ReplyDetails], dict[str, Any]] | None = None


def _duration_sensor(
    key: str, value_fn: Callable[[ReplyDetails], int | None]
) -> CasitaReplySensorDescription:
    """Describe a sensor showing how long a step of the last reply took."""
    return CasitaReplySensorDescription(
        key=key,
        translation_key=key,
        device_class=SensorDeviceClass.DURATION,
        native_unit_of_measurement=UnitOfTime.MILLISECONDS,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=value_fn,
    )


def _local_result_attributes(details: ReplyDetails) -> dict[str, Any]:
    if (local := details.local) is None:
        return dict.fromkeys(_LOCAL_RESULT_ATTRIBUTES)
    attributes = local.as_dict()
    del attributes["result"]
    return attributes


_LOCAL_RESULT_ATTRIBUTES = ("language", "intent", "slots", "error_code")


def _original_text(details: ReplyDetails) -> str | None:
    if details.original_text is None:
        return None
    return details.original_text[:MAX_STATE_LENGTH]


REPLY_SENSORS: tuple[CasitaReplySensorDescription, ...] = (
    CasitaReplySensorDescription(
        key="last_path",
        translation_key="last_path",
        device_class=SensorDeviceClass.ENUM,
        options=[path.value for path in ReplyPath],
        value_fn=lambda details: details.path.value,
    ),
    CasitaReplySensorDescription(
        key="last_local_result",
        translation_key="last_local_result",
        device_class=SensorDeviceClass.ENUM,
        options=[result.value for result in LocalResult],
        value_fn=lambda details: details.local.result.value if details.local else None,
        attributes_fn=_local_result_attributes,
    ),
    CasitaReplySensorDescription(
        key="last_restyle",
        translation_key="last_restyle",
        device_class=SensorDeviceClass.ENUM,
        options=[result.value for result in RestyleResult],
        value_fn=lambda details: details.restyle.value,
    ),
    _duration_sensor("last_duration", lambda details: details.total_ms),
    _duration_sensor("last_local_duration", lambda details: details.local_ms),
    _duration_sensor("last_llm_duration", lambda details: details.llm_ms),
    _duration_sensor("last_ai_task_duration", lambda details: details.ai_task_ms),
    CasitaReplySensorDescription(
        key="last_original_text",
        translation_key="last_original_text",
        value_fn=_original_text,
    ),
)


class CasitaReplySensor(CasitaEntity, SensorEntity):
    """A detail of the last reply, to see how Casita answered."""

    entity_description: CasitaReplySensorDescription
    _attr_entity_category = EntityCategory.DIAGNOSTIC

    def __init__(
        self, entry: CasitaConfigEntry, description: CasitaReplySensorDescription
    ) -> None:
        """Initialize the sensor."""
        super().__init__(entry, reply_unique_id(entry.entry_id, description.key))
        self.entity_description = description
        if description.attributes_fn is not None:
            self._attr_extra_state_attributes = dict.fromkeys(_LOCAL_RESULT_ATTRIBUTES)

    @override
    async def async_added_to_hass(self) -> None:
        """Listen to replies."""
        await super().async_added_to_hass()
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass,
                SIGNAL_EMOTION_UPDATED.format(self._entry.entry_id),
                self._async_handle_update,
            )
        )

    @callback
    def _async_handle_update(self, update: EmotionUpdate) -> None:
        """Show the detail of a reply, not of an emotion set by hand."""
        if (details := update.details) is None:
            return
        description = self.entity_description
        self._attr_native_value = description.value_fn(details)
        if description.attributes_fn is not None:
            self._attr_extra_state_attributes = description.attributes_fn(details)
        self.async_write_ha_state()

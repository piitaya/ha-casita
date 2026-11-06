"""Base entity for Casita."""

from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.entity import Entity

from .const import DOMAIN
from .models import CasitaConfigEntry


class CasitaEntity(Entity):
    """Entity grouped under the Casita device of its config entry."""

    _attr_has_entity_name = True
    _attr_should_poll = False

    def __init__(self, entry: CasitaConfigEntry, unique_id: str) -> None:
        """Initialize the entity."""
        self._entry = entry
        self._attr_unique_id = unique_id
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
            name=entry.title,
            entry_type=DeviceEntryType.SERVICE,
        )

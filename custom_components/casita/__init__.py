"""The Casita integration."""

from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.storage import Store
from homeassistant.helpers.typing import ConfigType
from homeassistant.loader import async_get_integration

from .const import DOMAIN
from .models import CasitaConfigEntry, CasitaData
from .mood import STORAGE_VERSION, CasitaMood, StoredMood, storage_key
from .panel import (
    async_register_panel,
    async_register_static_path,
    async_unregister_panel,
)
from .services import async_setup_services
from .websocket_api import async_setup_websocket_api

PLATFORMS: list[Platform] = [Platform.CONVERSATION, Platform.SENSOR]

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the panel files, the actions and the websocket commands."""
    await async_register_static_path(hass)
    async_setup_services(hass)
    async_setup_websocket_api(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: CasitaConfigEntry) -> bool:
    """Set up Casita from a config entry."""
    integration = await async_get_integration(hass, DOMAIN)
    mood = CasitaMood(hass, entry)
    await mood.async_load()
    entry.runtime_data = CasitaData(mood=mood, version=str(integration.version))
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    mood.async_start()
    await async_register_panel(hass, entry)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: CasitaConfigEntry) -> bool:
    """Unload a config entry."""
    if not await hass.config_entries.async_unload_platforms(entry, PLATFORMS):
        return False
    await entry.runtime_data.mood.async_save()
    await async_unregister_panel(hass, entry)
    return True


async def async_remove_entry(hass: HomeAssistant, entry: CasitaConfigEntry) -> None:
    """Remove the saved mood of a removed entry."""
    await Store[StoredMood](hass, STORAGE_VERSION, storage_key(entry)).async_remove()

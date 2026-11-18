"""Casita panel in the sidebar."""

import hashlib
from pathlib import Path
from typing import Final

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant, callback
from homeassistant.util.hass_dict import HassKey

from .const import (
    DOMAIN,
    LOGGER,
    PANEL_ICON,
    PANEL_MODULE,
    PANEL_STATIC_URL,
    PANEL_TITLE,
    PANEL_URL_PATH,
    PANEL_WEBCOMPONENT,
)
from .models import CasitaConfigEntry

FRONTEND_DIR: Final = Path(__file__).parent / "frontend"

# Entry the panel shows
DATA_PANEL_ENTRY: HassKey[str] = HassKey(f"{DOMAIN}_panel_entry")


async def async_register_static_path(hass: HomeAssistant) -> None:
    """Serve the files of the panel.

    Routes cannot be removed, so this is done once, when Casita is set up.
    """
    module = FRONTEND_DIR / PANEL_MODULE
    is_dir, has_module = await hass.async_add_executor_job(
        lambda: (FRONTEND_DIR.is_dir(), module.is_file())
    )
    if not has_module:
        LOGGER.warning("The Casita panel is missing: %s", module)
    if is_dir:
        config = StaticPathConfig(PANEL_STATIC_URL, str(FRONTEND_DIR), True)
    else:
        # Without the folder, Home Assistant would serve it as one file
        config = StaticPathConfig(
            f"{PANEL_STATIC_URL}/{PANEL_MODULE}", str(module), True
        )
    await hass.http.async_register_static_paths([config])


def _module_hash() -> str | None:
    """Return a short hash of the bundle, or None without it."""
    try:
        return hashlib.sha256((FRONTEND_DIR / PANEL_MODULE).read_bytes()).hexdigest()[:8]
    except OSError:
        return None


async def async_register_panel(hass: HomeAssistant, entry: CasitaConfigEntry) -> None:
    """Show the panel for an entry, unless it shows another one."""
    if DATA_PANEL_ENTRY in hass.data:
        return
    version = entry.runtime_data.version
    # The file is cached for a month: a new bundle with the same version
    # (a reinstall, a branch) needs a new URL
    digest = await hass.async_add_executor_job(_module_hash)
    tag = f"{version}-{digest}" if digest else version
    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_URL_PATH,
        webcomponent_name=PANEL_WEBCOMPONENT,
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        module_url=f"{PANEL_STATIC_URL}/{PANEL_MODULE}?v={tag}",
        embed_iframe=False,
        require_admin=False,
        config={"entry_id": entry.entry_id, "version": version},
        # The panel pads its toolbar and chat for the notch and home bar itself
        handle_safe_area=True,
    )
    hass.data[DATA_PANEL_ENTRY] = entry.entry_id


async def async_unregister_panel(hass: HomeAssistant, entry: CasitaConfigEntry) -> None:
    """Move the panel to another entry, or remove it with the last one."""
    if hass.data.get(DATA_PANEL_ENTRY) != entry.entry_id:
        return
    _async_remove_panel(hass)
    for other in hass.config_entries.async_loaded_entries(DOMAIN):
        if other.entry_id != entry.entry_id:
            await async_register_panel(hass, other)
            return


@callback
def _async_remove_panel(hass: HomeAssistant) -> None:
    frontend.async_remove_panel(hass, PANEL_URL_PATH, warn_if_unknown=False)
    hass.data.pop(DATA_PANEL_ENTRY, None)

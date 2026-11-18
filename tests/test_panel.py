"""Tests for the panel of Casita."""

from collections.abc import Iterator
import hashlib
from http import HTTPStatus
import json
from pathlib import Path
from unittest.mock import patch

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry
from pytest_homeassistant_custom_component.typing import ClientSessionGenerator

from custom_components.casita.const import DOMAIN
from homeassistant.components.frontend import DATA_PANELS
from homeassistant.core import HomeAssistant

MODULE = "export class CasitaPanel extends HTMLElement {}\n"
MODULE_HASH = hashlib.sha256(MODULE.encode()).hexdigest()[:8]
VERSION = json.loads(
    (Path(__file__).parents[1] / "custom_components/casita/manifest.json").read_text()
)["version"]


@pytest.fixture
def frontend_dir(tmp_path: Path) -> Iterator[Path]:
    """Serve a stub panel instead of the bundle."""
    (tmp_path / "casita-panel.js").write_text(MODULE)
    with patch("custom_components.casita.panel.FRONTEND_DIR", tmp_path):
        yield tmp_path


async def _setup_entry(hass: HomeAssistant, title: str = "Casita") -> MockConfigEntry:
    entry = MockConfigEntry(domain=DOMAIN, title=title, options={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


@pytest.mark.usefixtures("setup_ha", "frontend_dir")
async def test_panel(hass: HomeAssistant, hass_client: ClientSessionGenerator) -> None:
    """Test the panel is registered for the first entry and its file served."""
    entry = await _setup_entry(hass)

    panel = hass.data[DATA_PANELS]["casita"].to_response()
    assert panel["component_name"] == "custom"
    assert panel["url_path"] == "casita"
    assert panel["title"] == "Casita"
    assert panel["icon"] == "mdi:home-heart"
    assert panel["require_admin"] is False
    assert panel["config"] == {
        "entry_id": entry.entry_id,
        "version": VERSION,
        "_panel_custom": {
            "name": "casita-panel",
            "embed_iframe": False,
            "trust_external": False,
            "handle_safe_area": True,
            "module_url": f"/casita_static/casita-panel.js?v={VERSION}-{MODULE_HASH}",
        },
    }

    client = await hass_client()
    response = await client.get(f"/casita_static/casita-panel.js?v={VERSION}-{MODULE_HASH}")
    assert response.status == HTTPStatus.OK
    assert await response.text() == MODULE
    assert "max-age" in response.headers["Cache-Control"]


@pytest.mark.usefixtures("setup_ha", "frontend_dir")
async def test_panel_follows_entries(hass: HomeAssistant) -> None:
    """Test one panel for several entries, removed with the last one."""
    first = await _setup_entry(hass)
    second = await _setup_entry(hass, "Casita bis")
    panels = hass.data[DATA_PANELS]
    assert panels["casita"].config["entry_id"] == first.entry_id

    # The panel moves to the entry that is left
    assert await hass.config_entries.async_unload(first.entry_id)
    assert panels["casita"].config["entry_id"] == second.entry_id

    # Unloading another entry keeps it
    assert await hass.config_entries.async_setup(first.entry_id)
    assert await hass.config_entries.async_unload(first.entry_id)
    assert panels["casita"].config["entry_id"] == second.entry_id

    assert await hass.config_entries.async_unload(second.entry_id)
    assert "casita" not in panels

    # And comes back with an entry
    assert await hass.config_entries.async_setup(first.entry_id)
    assert panels["casita"].config["entry_id"] == first.entry_id


@pytest.mark.usefixtures("setup_ha")
async def test_missing_bundle(
    hass: HomeAssistant,
    hass_client: ClientSessionGenerator,
    tmp_path: Path,
    caplog: pytest.LogCaptureFixture,
) -> None:
    """Test the panel is registered when its file is missing, and served later."""
    missing = tmp_path / "frontend"
    with patch("custom_components.casita.panel.FRONTEND_DIR", missing):
        await _setup_entry(hass)
    assert "The Casita panel is missing" in caplog.text
    assert "casita" in hass.data[DATA_PANELS]

    client = await hass_client()
    response = await client.get("/casita_static/casita-panel.js")
    assert response.status == HTTPStatus.NOT_FOUND

    missing.mkdir()
    (missing / "casita-panel.js").write_text(MODULE)
    response = await client.get("/casita_static/casita-panel.js")
    assert response.status == HTTPStatus.OK

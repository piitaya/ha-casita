"""Tests for the brand images Casita ships."""

from http import HTTPStatus
from pathlib import Path

from PIL import Image
import pytest
from pytest_homeassistant_custom_component.typing import ClientSessionGenerator

from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component

BRAND = Path(__file__).parent.parent / "custom_components" / "casita" / "brand"


@pytest.mark.parametrize(
    ("image", "size"),
    [
        ("icon.png", (256, 256)),
        ("icon@2x.png", (512, 512)),
        ("logo.png", None),
        ("logo@2x.png", None),
        ("dark_logo.png", None),
        ("dark_logo@2x.png", None),
    ],
)
def test_brand_images(image: str, size: tuple[int, int] | None) -> None:
    """Test the images follow the rules of the brands repository."""
    with Image.open(BRAND / image) as png:
        assert png.format == "PNG"
        assert png.mode == "RGBA"
        if size is not None:
            assert png.size == size
        else:
            # Landscape, shortest side as large as allowed
            width, height = png.size
            assert width > height
            assert height == (512 if "@2x" in image else 256)
        # Trimmed: something is drawn on the left and right edges
        alpha = png.getchannel("A")
        assert alpha.getbbox() is not None
        left, _top, right, _bottom = alpha.getbbox()
        assert left == 0
        assert right == png.width


@pytest.mark.parametrize(
    ("image", "file"),
    [
        ("icon.png", "icon.png"),
        ("logo@2x.png", "logo@2x.png"),
        # No dark icon, Home Assistant falls back to the icon
        ("dark_icon.png", "icon.png"),
    ],
)
async def test_served_by_home_assistant(
    hass: HomeAssistant,
    hass_client: ClientSessionGenerator,
    image: str,
    file: str,
) -> None:
    """Test Home Assistant serves the images of the brand folder."""
    assert await async_setup_component(hass, "brands", {})
    client = await hass_client()
    response = await client.get(f"/api/brands/integration/casita/{image}")
    assert response.status == HTTPStatus.OK
    assert await response.read() == (BRAND / file).read_bytes()

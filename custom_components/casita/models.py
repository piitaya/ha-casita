"""Runtime data of a Casita config entry."""

from dataclasses import dataclass

from homeassistant.config_entries import ConfigEntry

from .mood import CasitaMood


@dataclass(slots=True)
class CasitaData:
    """Runtime data of a Casita config entry."""

    mood: CasitaMood
    version: str


type CasitaConfigEntry = ConfigEntry[CasitaData]

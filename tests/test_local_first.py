"""Tests for local commands in French, the way Assist calls Casita."""

from collections.abc import AsyncIterable, AsyncIterator
from typing import Any, override

import pytest
from pytest_homeassistant_custom_component.common import async_mock_service
from pytest_homeassistant_custom_component.typing import WebSocketGenerator

from custom_components.casita.const import DOMAIN
from homeassistant.components import assist_pipeline, conversation, stt
from homeassistant.components.assist_pipeline.pipeline import KEY_ASSIST_PIPELINE
from homeassistant.components.homeassistant.exposed_entities import async_expose_entity
from homeassistant.components.stt.const import DATA_COMPONENT as STT_COMPONENT
from homeassistant.core import Context, HomeAssistant, ServiceCall
from homeassistant.helpers import (
    area_registry as ar,
    chat_session,
    entity_registry as er,
)
from homeassistant.setup import async_setup_component

from .conftest import FakeLLMAgent

CASITA = "conversation.casita"
OFFICE_LIGHTS = ("light.barres_hue_play", "light.spots")
OFFICE_SHUTTER = "cover.volet_bureau"
COVER_ATTRIBUTES = {
    "friendly_name": "Volet",
    "device_class": "shutter",
    "supported_features": 15,
}


@pytest.fixture
async def french_home(
    hass: HomeAssistant,
    setup_ha: None,
    area_registry: ar.AreaRegistry,
    entity_registry: er.EntityRegistry,
) -> None:
    """Set up a French home.

    The office has two lights and a shutter named "Volet", plus a second "Volet"
    without state. The living room has another "Volet".
    """
    hass.config.language = "fr"
    hass.config.country = "FR"
    office = area_registry.async_create("Bureau")
    living_room = area_registry.async_create("Salon")
    for entity_id, area, state, attributes in (
        ("light.barres_hue_play", office, "off", {"friendly_name": "Barres Hue Play"}),
        ("light.spots", office, "off", {"friendly_name": "Spots"}),
        (OFFICE_SHUTTER, office, "closed", COVER_ATTRIBUTES),
        ("cover.volet_fantome", office, None, None),
        ("cover.volet_salon", living_room, "closed", COVER_ATTRIBUTES),
    ):
        domain, object_id = entity_id.split(".")
        entry = entity_registry.async_get_or_create(
            domain,
            "test",
            object_id,
            suggested_object_id=object_id,
            original_name=attributes["friendly_name"] if attributes else "Volet",
        )
        entity_registry.async_update_entity(entry.entity_id, area_id=area.id)
        if state is not None:
            hass.states.async_set(entry.entity_id, state, attributes)
        async_expose_entity(hass, conversation.DOMAIN, entry.entity_id, True)


@pytest.fixture
def cover_calls(hass: HomeAssistant) -> list[ServiceCall]:
    """Mock the cover services."""
    return async_mock_service(hass, "cover", "open_cover")


async def _converse(
    hass: HomeAssistant,
    text: str,
    language: str | None,
    conversation_id: str | None = None,
) -> conversation.ConversationResult:
    return await conversation.async_converse(
        hass, text, conversation_id, Context(), language=language, agent_id=CASITA
    )


def _targets(calls: list[ServiceCall], service: str = "turn_on") -> set[str]:
    targets: set[str] = set()
    for call in calls:
        if call.service == service:
            entity_ids = call.data["entity_id"]
            targets.update([entity_ids] if isinstance(entity_ids, str) else entity_ids)
    return targets


def _state(hass: HomeAssistant, key: str) -> tuple[str, dict[str, Any]]:
    """Return a sensor of Casita. Its entity id is in French here."""
    entry = hass.config_entries.async_entries(DOMAIN)[0]
    entity_id = er.async_get(hass).async_get_entity_id(
        "sensor", DOMAIN, f"{entry.entry_id}_{key}"
    )
    assert entity_id is not None
    state = hass.states.get(entity_id)
    assert state is not None
    return state.state, dict(state.attributes)


@pytest.mark.usefixtures("french_home", "config_entry")
@pytest.mark.parametrize("language", ["fr", "fr-FR", "fr_FR", None, "*"])
async def test_local_command_french(
    hass: HomeAssistant,
    llm_agent: FakeLLMAgent,
    light_calls: list[ServiceCall],
    language: str | None,
) -> None:
    """Test a French command is handled locally, whatever the language tag."""
    result = await _converse(hass, "Allume la lumière du bureau", language)

    assert llm_agent.inputs == []
    assert _targets(light_calls) == set(OFFICE_LIGHTS)
    assert result.response.response_type.value == "action_done"
    assert _state(hass, "last_path")[0] == "local"
    state, attributes = _state(hass, "last_local_result")
    assert state == "matched"
    assert attributes["intent"] == "HassTurnOn"
    assert attributes["slots"] == {"area": "bureau", "domain": ["light"]}
    assert attributes["error_code"] is None


@pytest.mark.usefixtures("french_home", "config_entry", "light_calls")
async def test_text_without_accents(
    hass: HomeAssistant, llm_agent: FakeLLMAgent
) -> None:
    """Test text without accents goes to the LLM, like in a pipeline.

    Local commands only match exact sentences, like "Prefer handling commands
    locally" does.
    """
    text = "allume la lumiere du bureau"
    user_input = conversation.ConversationInput(
        text=text,
        context=Context(),
        conversation_id=None,
        device_id=None,
        satellite_id=None,
        language="fr",
        agent_id=CASITA,
    )
    try:
        # Home Assistant 2026.11 wants the context of the caller
        session_manager = chat_session.async_get_chat_session(
            hass, context=user_input.context
        )
    except TypeError:
        session_manager = chat_session.async_get_chat_session(hass)
    with (
        session_manager as session,
        conversation.async_get_chat_log(hass, session, user_input) as chat_log,
    ):
        assert (
            await conversation.async_handle_intents(hass, user_input, chat_log) is None
        )

    await _converse(hass, text, "fr")
    assert len(llm_agent.inputs) == 1
    assert _state(hass, "last_local_result")[0] == "no_match"


@pytest.mark.usefixtures("french_home", "config_entry")
async def test_local_command_after_llm_turns(
    hass: HomeAssistant, llm_agent: FakeLLMAgent, light_calls: list[ServiceCall]
) -> None:
    """Test a command is handled locally in a conversation the LLM answered."""
    llm_agent.reply = "[emotion:Happy] Coucou !"
    result = await _converse(hass, "salut toi", "fr")
    result = await _converse(hass, "ça va ?", "fr", result.conversation_id)
    assert len(llm_agent.inputs) == 2

    await _converse(hass, "Allume la lumière du bureau", "fr", result.conversation_id)

    assert len(llm_agent.inputs) == 2
    assert _targets(light_calls) == set(OFFICE_LIGHTS)


@pytest.mark.usefixtures("french_home", "config_entry")
async def test_duplicate_name_goes_to_llm(
    hass: HomeAssistant, llm_agent: FakeLLMAgent, cover_calls: list[ServiceCall]
) -> None:
    """Test two entities with the same name in the area leave it to the LLM.

    Home Assistant does not know which "Volet" of the office to open, the
    pipeline would hand the turn to the LLM the same way.
    """
    await _converse(hass, "Ouvre le volet du bureau", "fr")
    assert llm_agent.inputs == []
    assert _targets(cover_calls, "open_cover") == {OFFICE_SHUTTER}

    # The second "Volet" of the office gets a state
    hass.states.async_set("cover.volet_fantome", "unavailable", COVER_ATTRIBUTES)
    await _converse(hass, "Ouvre le volet du bureau", "fr")

    assert len(llm_agent.inputs) == 1
    state, attributes = _state(hass, "last_local_result")
    assert state == "no_valid_targets"
    assert attributes["language"] == "fr"
    assert attributes["intent"] == "HassTurnOn"
    assert attributes["slots"] == {"name": "Volet", "area": "Bureau"}
    assert attributes["error_code"] == "no_valid_targets"


async def _run_text_pipeline(
    client: Any, pipeline_id: str, text: str, conversation_id: str | None = None
) -> dict[str, Any]:
    """Run the intent stage like the Assist dialog does, return intent-end data."""
    await client.send_json_auto_id(
        {
            "type": "assist_pipeline/run",
            "start_stage": "intent",
            "end_stage": "intent",
            "input": {"text": text},
            "pipeline": pipeline_id,
            "conversation_id": conversation_id,
        }
    )
    msg = await client.receive_json()
    assert msg["success"], msg
    data: dict[str, Any] = {}
    while True:
        msg = await client.receive_json()
        event = msg["event"]
        assert event["type"] != "error", event
        if event["type"] == "intent-end":
            data = event["data"]
        if event["type"] == "run-end":
            return data


@pytest.mark.usefixtures("french_home", "config_entry")
async def test_text_pipeline_without_prefer_local(
    hass: HomeAssistant,
    hass_ws_client: WebSocketGenerator,
    llm_agent: FakeLLMAgent,
    cover_calls: list[ServiceCall],
) -> None:
    """Test a pipeline with Casita and "Prefer handling commands locally" off."""
    assert await async_setup_component(hass, "assist_pipeline", {})
    client = await hass_ws_client(hass)
    await client.send_json_auto_id(
        {
            "type": "assist_pipeline/pipeline/create",
            "conversation_engine": CASITA,
            "conversation_language": "*",
            "language": "fr-FR",
            "name": "Casita",
            "stt_engine": None,
            "stt_language": None,
            "tts_engine": None,
            "tts_language": None,
            "tts_voice": None,
            "wake_word_entity": None,
            "wake_word_id": None,
            "prefer_local_intents": False,
        }
    )
    msg = await client.receive_json()
    assert msg["success"], msg
    pipeline_id = msg["result"]["id"]

    llm_agent.reply = "[emotion:Happy] Coucou !"
    data = await _run_text_pipeline(client, pipeline_id, "salut toi")
    conversation_id = data["intent_output"]["conversation_id"]

    data = await _run_text_pipeline(
        client, pipeline_id, "Ouvre le volet du bureau", conversation_id
    )

    assert len(llm_agent.inputs) == 1
    assert llm_agent.inputs[0].language == "fr-FR"
    assert _targets(cover_calls, "open_cover") == {OFFICE_SHUTTER}
    assert data["processed_locally"] is False
    response = data["intent_output"]["response"]
    assert response["response_type"] == "action_done"
    # How Casita answered, in the raw data of the debug view
    casita = response["speech"]["plain"]["extra_data"]["casita"]
    assert casita["path"] == "local"
    assert casita["local_result"] == "matched"


class FakeSTT(stt.SpeechToTextEntity):
    """Speech-to-text returning a fixed text."""

    _attr_name = "Fake STT"

    def __init__(self, text: str) -> None:
        """Initialize the entity."""
        self.text = text

    @property
    @override
    def supported_languages(self) -> list[str]:
        return ["fr-FR"]

    @property
    @override
    def supported_formats(self) -> list[stt.AudioFormats]:
        return [stt.AudioFormats.WAV]

    @property
    @override
    def supported_codecs(self) -> list[stt.AudioCodecs]:
        return [stt.AudioCodecs.PCM]

    @property
    @override
    def supported_bit_rates(self) -> list[stt.AudioBitRates]:
        return [stt.AudioBitRates.BITRATE_16]

    @property
    @override
    def supported_sample_rates(self) -> list[stt.AudioSampleRates]:
        return [stt.AudioSampleRates.SAMPLERATE_16000]

    @property
    @override
    def supported_channels(self) -> list[stt.AudioChannels]:
        return [stt.AudioChannels.CHANNEL_MONO]

    @override
    async def async_process_audio_stream(
        self, metadata: stt.SpeechMetadata, stream: AsyncIterable[bytes]
    ) -> stt.SpeechResult:
        async for _chunk in stream:
            pass
        return stt.SpeechResult(self.text, stt.SpeechResultState.SUCCESS)


async def _audio() -> AsyncIterator[bytes]:
    yield b"\0" * 320
    yield b""


@pytest.mark.usefixtures("french_home", "config_entry")
async def test_voice_pipeline_without_prefer_local(
    hass: HomeAssistant, llm_agent: FakeLLMAgent, cover_calls: list[ServiceCall]
) -> None:
    """Test a voice command, with the agents prepared during speech-to-text."""
    assert await async_setup_component(hass, "stt", {})
    assert await async_setup_component(hass, "assist_pipeline", {})
    entity = FakeSTT("Ouvre le volet du bureau.")
    entity.entity_id = "stt.fake"
    await hass.data[STT_COMPONENT].async_add_entities([entity])
    pipeline = await hass.data[KEY_ASSIST_PIPELINE].pipeline_store.async_create_item(
        {
            "conversation_engine": CASITA,
            "conversation_language": "*",
            "language": "fr",
            "name": "Casita",
            "stt_engine": "stt.fake",
            "stt_language": "fr-FR",
            "tts_engine": None,
            "tts_language": None,
            "tts_voice": None,
            "wake_word_entity": None,
            "wake_word_id": None,
            "prefer_local_intents": False,
        }
    )
    events: list[assist_pipeline.PipelineEvent] = []

    await assist_pipeline.async_pipeline_from_audio_stream(
        hass,
        context=Context(),
        event_callback=events.append,
        stt_metadata=stt.SpeechMetadata(
            language="",
            format=stt.AudioFormats.WAV,
            codec=stt.AudioCodecs.PCM,
            bit_rate=stt.AudioBitRates.BITRATE_16,
            sample_rate=stt.AudioSampleRates.SAMPLERATE_16000,
            channel=stt.AudioChannels.CHANNEL_MONO,
        ),
        stt_stream=_audio(),
        pipeline_id=pipeline.id,
        end_stage=assist_pipeline.PipelineStage.INTENT,
    )

    intent_start = next(event for event in events if event.type == "intent-start")
    assert intent_start.data is not None
    assert intent_start.data["language"] == "fr-FR"
    assert llm_agent.inputs == []
    assert _targets(cover_calls, "open_cover") == {OFFICE_SHUTTER}


@pytest.mark.usefixtures("french_home", "config_entry")
async def test_more_info_assist_dialog(
    hass: HomeAssistant,
    hass_ws_client: WebSocketGenerator,
    llm_agent: FakeLLMAgent,
    light_calls: list[ServiceCall],
) -> None:
    """Test the Assist dialog of the more info of Casita.

    The frontend gets a pipeline for the entity with
    assist_pipeline/pipeline/get and runs it with the entity id as pipeline id.
    Home Assistant cannot match the language of the system with the "*" of an
    agent that relies on an LLM, so that pipeline sends "en".
    """
    assert await async_setup_component(hass, "assist_pipeline", {})
    client = await hass_ws_client(hass)
    await client.send_json_auto_id(
        {"type": "assist_pipeline/pipeline/get", "pipeline_id": CASITA}
    )
    msg = await client.receive_json()
    assert msg["success"], msg
    pipeline = msg["result"]
    assert pipeline["id"] == CASITA
    assert pipeline["language"] == "fr"
    # The language Casita gets from this pipeline
    assert pipeline["conversation_language"] == "en"

    data = await _run_text_pipeline(client, CASITA, "Allume la lumière du bureau")

    assert llm_agent.inputs == []
    assert _targets(light_calls) == set(OFFICE_LIGHTS)
    assert data["intent_output"]["response"]["response_type"] == "action_done"
    state, attributes = _state(hass, "last_local_result")
    assert state == "matched"
    assert attributes["language"] == "fr"

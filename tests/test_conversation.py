"""Tests for the Casita conversation agent."""

import logging
from typing import Any
from unittest.mock import patch

from freezegun.api import FrozenDateTimeFactory
import pytest
from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    async_capture_events,
)

from custom_components.casita.const import (
    CONF_AI_TASK_ENTITY,
    CONF_EMOTION_FALLBACK_AI_TASK,
    CONF_EXTRA_PERSONALITY,
    CONF_LLM_AGENT,
    CONF_LOCAL_FIRST,
    CONF_RESTYLE_LOCAL,
    CONF_RESTYLE_TIMEOUT,
    EVENT_CASITA_EMOTION,
)
from custom_components.casita.conversation import check_rewrite, clean_rewrite
from custom_components.casita.emotion import RestyleResult
from custom_components.casita.mood import Interaction
from custom_components.casita.prompts import build_casita_prompt
from homeassistant.components import conversation
from homeassistant.const import EntityCategory
from homeassistant.core import Context, HomeAssistant, ServiceCall
from homeassistant.helpers import chat_session, entity_registry as er, intent

from .conftest import AI_TASK_ENTITY_ID, LLM_AGENT_ID, FakeAITask, FakeLLMAgent

CASITA = "conversation.casita"
SENSOR = "sensor.casita_emotion"
LOCAL_ONLY: dict[str, Any] = {CONF_LOCAL_FIRST: True}


async def _converse(
    hass: HomeAssistant,
    text: str,
    conversation_id: str | None = None,
    extra_system_prompt: str | None = None,
) -> conversation.ConversationResult:
    return await conversation.async_converse(
        hass,
        text,
        conversation_id,
        Context(),
        language="en",
        agent_id=CASITA,
        device_id="satellite_device",
        extra_system_prompt=extra_system_prompt,
    )


def _speech(result: conversation.ConversationResult) -> str:
    return result.response.speech["plain"]["speech"]


def _emotion(hass: HomeAssistant) -> tuple[str, str | None]:
    state = hass.states.get(SENSOR)
    assert state is not None
    return state.state, state.attributes["source"]


def _mood_line(hass: HomeAssistant, entry: MockConfigEntry) -> str:
    return entry.runtime_data.mood.async_describe("en")


def _llm_prompt(hass: HomeAssistant, entry: MockConfigEntry, extra: str | None) -> str:
    return f"{build_casita_prompt('en', extra)}\n{_mood_line(hass, entry)}"


@pytest.mark.parametrize("options", [LOCAL_ONLY])
@pytest.mark.usefixtures("config_entry")
async def test_local_only_action(
    hass: HomeAssistant, light_calls: list[ServiceCall]
) -> None:
    """Test a command handled by the local agent."""
    result = await _converse(hass, "turn on the kitchen light")

    assert result.response.response_type is intent.IntentResponseType.ACTION_DONE
    assert _speech(result) == "Turned on the light"
    assert len(light_calls) == 1
    assert _emotion(hass) == ("Happy", "local")


@pytest.mark.parametrize("options", [LOCAL_ONLY])
@pytest.mark.usefixtures("config_entry", "light_calls")
async def test_local_rules_use_local_time(
    hass: HomeAssistant, freezer: FrozenDateTimeFactory
) -> None:
    """Test the time rules use the time zone of Home Assistant."""
    await hass.config.async_set_time_zone("Europe/Paris")
    freezer.move_to("2026-11-06T19:30:00+01:00")
    await _converse(hass, "turn on the kitchen light")
    assert _emotion(hass) == ("Smiling", "local")

    freezer.move_to("2026-11-06T23:45:00+01:00")
    await _converse(hass, "turn off the kitchen light")
    assert _emotion(hass) == ("Sleeping", "local")


@pytest.mark.parametrize("options", [LOCAL_ONLY])
@pytest.mark.usefixtures("config_entry")
@pytest.mark.parametrize(
    ("text", "error_code", "emotion"),
    [
        ("blah blah blah", intent.IntentResponseErrorCode.NO_INTENT_MATCH, "Pleading"),
        (
            "turn on the bedroom light",
            intent.IntentResponseErrorCode.NO_VALID_TARGETS,
            "Problem",
        ),
    ],
)
async def test_local_only_errors(
    hass: HomeAssistant,
    text: str,
    error_code: intent.IntentResponseErrorCode,
    emotion: str,
) -> None:
    """Test errors of the local agent are returned with an emotion."""
    result = await _converse(hass, text)

    assert result.response.response_type is intent.IntentResponseType.ERROR
    assert result.response.error_code is error_code
    assert _emotion(hass) == (emotion, "local")


@pytest.mark.usefixtures("config_entry")
async def test_local_first(
    hass: HomeAssistant, llm_agent: FakeLLMAgent, light_calls: list[ServiceCall]
) -> None:
    """Test commands understood locally do not reach the LLM."""
    result = await _converse(hass, "turn on the kitchen light")

    assert _speech(result) == "Turned on the light"
    assert len(light_calls) == 1
    assert llm_agent.inputs == []
    assert _emotion(hass) == ("Happy", "local")


@pytest.mark.usefixtures("config_entry", "light_calls")
async def test_question_left_to_llm(
    hass: HomeAssistant, llm_agent: FakeLLMAgent
) -> None:
    """Test a question goes to an LLM that can control the home."""
    await _converse(hass, "is the kitchen light on")

    assert len(llm_agent.inputs) == 1
    state = hass.states.get("sensor.casita_last_local_result")
    assert state is not None
    assert state.state == "filtered"
    assert state.attributes["intent"] == "HassGetState"
    assert state.attributes["error_code"] is None


@pytest.mark.usefixtures("config_entry", "light_calls")
async def test_llm_reads_local_turns(
    hass: HomeAssistant, llm_agent: FakeLLMAgent
) -> None:
    """Test local turns are in the chat log the LLM reads."""
    result = await _converse(hass, "turn on the kitchen light")
    await _converse(hass, "is it bright enough to read", result.conversation_id)

    history = llm_agent.histories[0]
    assert [content.role for content in history] == [
        "system",
        "user",
        "assistant",
        "tool_result",
        "assistant",
        "user",
    ]
    local_reply = history[4]
    assert isinstance(local_reply, conversation.AssistantContent)
    assert local_reply.agent_id == CASITA
    assert local_reply.content == "Turned on the light"
    assert history[5].content == "is it bright enough to read"


async def test_llm_reply(
    hass: HomeAssistant, config_entry: MockConfigEntry, llm_agent: FakeLLMAgent
) -> None:
    """Test the LLM reply loses its tag and gives the emotion."""
    llm_agent.reply = "[emotion:Silly] Why did the light bulb fail school? Too dim."
    expected_prompt = _llm_prompt(hass, config_entry, None)
    result = await _converse(hass, "tell me a joke")

    assert _speech(result) == "Why did the light bulb fail school? Too dim."
    assert result.response.response_type is intent.IntentResponseType.ACTION_DONE
    assert _emotion(hass) == ("Silly", "llm")

    assert len(llm_agent.inputs) == 1
    llm_input = llm_agent.inputs[0]
    assert llm_input.text == "tell me a joke"
    assert llm_input.agent_id == LLM_AGENT_ID
    assert llm_input.device_id == "satellite_device"
    assert llm_input.language == "en"
    # Same conversation, so the LLM reads the same chat log
    assert llm_input.conversation_id == result.conversation_id
    assert llm_input.extra_system_prompt == expected_prompt
    assert "[emotion:Happy]" in llm_agent.system_prompts[0]
    assert "Your mood right now:" in llm_agent.system_prompts[0]


@pytest.mark.usefixtures("config_entry")
async def test_llm_continue_conversation(
    hass: HomeAssistant, llm_agent: FakeLLMAgent
) -> None:
    """Test the result of the LLM is kept."""
    llm_agent.reply = "[emotion:Cheeky] Want another one?"
    result = await _converse(hass, "tell me a joke")

    assert _speech(result) == "Want another one?"
    assert result.continue_conversation is True


@pytest.mark.parametrize(
    "options",
    [
        {
            CONF_LLM_AGENT: LLM_AGENT_ID,
            CONF_EXTRA_PERSONALITY: "You call the user captain.",
        }
    ],
)
async def test_llm_prompt_keeps_caller_prompt(
    hass: HomeAssistant, config_entry: MockConfigEntry, llm_agent: FakeLLMAgent
) -> None:
    """Test the prompt of the caller is combined with the persona."""
    caller_prompt = "The user is cooking dinner."
    extra = "You call the user captain."
    # The mood the prompt is built with, a reply moves it
    expected = _llm_prompt(hass, config_entry, extra)
    result = await _converse(
        hass, "what goes well with pasta", extra_system_prompt=caller_prompt
    )
    first_prompt = llm_agent.inputs[0].extra_system_prompt
    assert first_prompt == f"{expected}\n\n{caller_prompt}"

    # Like the chat log, a later turn without a prompt keeps the last one, with
    # the mood of now
    config_entry.runtime_data.mood.async_interact(Interaction.SHAKE, 1)
    expected = _llm_prompt(hass, config_entry, extra)
    await _converse(hass, "and with rice", result.conversation_id)
    second_prompt = llm_agent.inputs[1].extra_system_prompt
    assert second_prompt != first_prompt
    assert second_prompt == f"{expected}\n\n{caller_prompt}"

    # A turn of a new conversation does not
    expected = _llm_prompt(hass, config_entry, extra)
    await _converse(hass, "what goes well with fish")
    assert llm_agent.inputs[2].extra_system_prompt == expected


@pytest.mark.usefixtures("config_entry")
@pytest.mark.parametrize(
    ("reply", "text", "speech", "emotion"),
    [
        ("Owls are birds", "tell me about owls", "Owls are birds", "Normal"),
        (
            "[emotion:Banana] Owls are birds",
            "tell me about owls",
            "Owls are birds",
            "Normal",
        ),
        (
            "[emotion:Banana] You're welcome",
            "merci beaucoup",
            "You're welcome",
            "Grateful",
        ),
    ],
)
async def test_llm_reply_without_valid_tag(
    hass: HomeAssistant,
    llm_agent: FakeLLMAgent,
    reply: str,
    text: str,
    speech: str,
    emotion: str,
) -> None:
    """Test a missing or invalid tag falls back to the rules."""
    llm_agent.reply = reply
    result = await _converse(hass, text)

    assert _speech(result) == speech
    assert _emotion(hass) == (emotion, "fallback")


@pytest.mark.parametrize(
    "options",
    [
        {
            CONF_LLM_AGENT: LLM_AGENT_ID,
            CONF_AI_TASK_ENTITY: AI_TASK_ENTITY_ID,
            CONF_EMOTION_FALLBACK_AI_TASK: True,
        }
    ],
)
@pytest.mark.usefixtures("config_entry")
async def test_llm_reply_ai_task_fallback(
    hass: HomeAssistant, llm_agent: FakeLLMAgent, ai_task_entity: FakeAITask
) -> None:
    """Test the AI Task picks the emotion when the tag is missing."""
    llm_agent.reply = "Here is a fun fact about owls."
    ai_task_entity.data = {"emotion": "UwU"}
    ai_task_entity.delay = 0.05
    result = await _converse(hass, "tell me something")

    # The reply does not wait for the AI Task
    assert _speech(result) == "Here is a fun fact about owls."
    assert _emotion(hass) == ("Normal", None)
    await hass.async_block_till_done()
    assert _emotion(hass) == ("UwU", "fallback")
    ai_task_entity.delay = 0
    assert len(ai_task_entity.tasks) == 1
    assert "Here is a fun fact about owls." in ai_task_entity.tasks[0].instructions

    # A valid tag does not need the AI Task
    llm_agent.reply = "[emotion:Happy] Owls again!"
    await _converse(hass, "tell me something")
    assert _emotion(hass) == ("Happy", "llm")
    assert len(ai_task_entity.tasks) == 1

    # An answer the AI Task cannot use falls back to the rules
    llm_agent.reply = "No tag here."
    ai_task_entity.data = {"emotion": "Banana"}
    await _converse(hass, "tell me something")
    await hass.async_block_till_done()
    assert _emotion(hass) == ("Normal", "fallback")


@pytest.mark.parametrize(
    "options", [{CONF_LLM_AGENT: LLM_AGENT_ID, CONF_LOCAL_FIRST: False}]
)
@pytest.mark.usefixtures("config_entry")
async def test_local_first_disabled(
    hass: HomeAssistant, llm_agent: FakeLLMAgent, light_calls: list[ServiceCall]
) -> None:
    """Test every request goes to the LLM when local first is off."""
    llm_agent.reply = "[emotion:Winking] Done, the kitchen is bright."
    result = await _converse(hass, "turn on the kitchen light")

    assert _speech(result) == "Done, the kitchen is bright."
    assert light_calls == []
    assert len(llm_agent.inputs) == 1
    assert _emotion(hass) == ("Winking", "llm")


@pytest.mark.parametrize(
    "options",
    [{CONF_LLM_AGENT: "conversation.missing"}, {CONF_LLM_AGENT: CASITA}],
)
@pytest.mark.usefixtures("config_entry")
async def test_llm_agent_unavailable(
    hass: HomeAssistant,
    light_calls: list[ServiceCall],
    caplog: pytest.LogCaptureFixture,
) -> None:
    """Test Casita answers locally when the LLM agent cannot be used."""
    result = await _converse(hass, "turn on the kitchen light")
    assert _speech(result) == "Turned on the light"
    assert _emotion(hass) == ("Happy", "local")

    result = await _converse(hass, "blah blah blah")
    assert result.response.error_code is intent.IntentResponseErrorCode.NO_INTENT_MATCH
    assert _emotion(hass) == ("Pleading", "local")
    assert caplog.text.count("is not available, answering locally") == 1


@pytest.mark.parametrize(
    "options",
    [{CONF_AI_TASK_ENTITY: AI_TASK_ENTITY_ID, CONF_RESTYLE_LOCAL: True}],
)
@pytest.mark.usefixtures("config_entry", "light_calls")
async def test_restyle_accepted(
    hass: HomeAssistant, ai_task_entity: FakeAITask
) -> None:
    """Test a local reply restyled by the AI Task, with its emotion."""
    ai_task_entity.data = {
        "text": "« Ta-da, the kitchen is lit! »",
        "emotion": "Grinning",
    }
    result = await _converse(hass, "turn on the kitchen light")

    assert _speech(result) == "Ta-da, the kitchen is lit!"
    assert _emotion(hass) == ("Grinning", "local")
    assert result.response.response_type is intent.IntentResponseType.ACTION_DONE
    assert len(ai_task_entity.tasks) == 1
    task = ai_task_entity.tasks[0]
    assert task.structure is not None
    assert "Your mood right now:" in task.instructions
    # What changes comes last, so providers can cache the rest
    assert task.instructions.startswith(build_casita_prompt("en", None).split("\n")[0])
    assert task.instructions.endswith(
        "Request: turn on the kitchen light\nReply: Turned on the light"
    )

    state = hass.states.get(SENSOR)
    assert state is not None
    assert state.attributes["path"] == "local_fallback"
    assert state.attributes["restyle"] == "applied"
    assert state.attributes["emotion_source"] == "ai_task"
    assert state.attributes["text"] == "Ta-da, the kitchen is lit!"
    original = hass.states.get("sensor.casita_last_original_text")
    assert original is not None
    assert original.state == "Turned on the light"

    # An invalid emotion keeps the rewrite, the rules pick the emotion
    ai_task_entity.data = {"text": "Ta-da, the kitchen is lit!", "emotion": "Banana"}
    result = await _converse(hass, "turn off the kitchen light")
    assert _speech(result) == "Ta-da, the kitchen is lit!"
    state = hass.states.get(SENSOR)
    assert state is not None
    assert state.state == "Happy"
    assert state.attributes["emotion_source"] == "rules"


@pytest.mark.parametrize(
    "options",
    [{CONF_AI_TASK_ENTITY: AI_TASK_ENTITY_ID, CONF_RESTYLE_LOCAL: True}],
)
@pytest.mark.usefixtures("config_entry", "light_calls")
@pytest.mark.parametrize(
    ("data", "restyle"),
    [
        ({"text": "Done! " * 20, "emotion": "Happy"}, "rejected_length"),
        ({"text": "", "emotion": "Happy"}, "error"),
        ({"emotion": "Happy"}, "error"),
        ("Not a dict", "error"),
    ],
)
async def test_restyle_rejected(
    hass: HomeAssistant, ai_task_entity: FakeAITask, data: Any, restyle: str
) -> None:
    """Test an unusable rewrite keeps the original reply."""
    ai_task_entity.data = data
    result = await _converse(hass, "turn on the kitchen light")

    assert _speech(result) == "Turned on the light"
    assert _emotion(hass) == ("Happy", "local")
    state = hass.states.get(SENSOR)
    assert state is not None
    assert state.attributes["restyle"] == restyle
    assert state.attributes["emotion_source"] == "rules"


@pytest.mark.parametrize(
    "options",
    [{CONF_AI_TASK_ENTITY: AI_TASK_ENTITY_ID, CONF_RESTYLE_LOCAL: True}],
)
@pytest.mark.usefixtures("config_entry")
async def test_restyle_rejected_missing_number(
    hass: HomeAssistant, ai_task_entity: FakeAITask, freezer: FrozenDateTimeFactory
) -> None:
    """Test a rewrite losing a number keeps the original reply."""
    freezer.move_to("2026-11-06T17:42:00-08:00")
    ai_task_entity.data = {"text": "Time to party!", "emotion": "Silly"}
    result = await _converse(hass, "what time is it")

    assert "42" in _speech(result)
    assert _emotion(hass) == ("Happy", "local")
    state = hass.states.get(SENSOR)
    assert state is not None
    assert state.attributes["restyle"] == "rejected_numbers"


@pytest.mark.parametrize(
    "options",
    [
        {
            CONF_AI_TASK_ENTITY: AI_TASK_ENTITY_ID,
            CONF_RESTYLE_LOCAL: True,
            CONF_RESTYLE_TIMEOUT: 0.01,
        }
    ],
)
@pytest.mark.usefixtures("config_entry", "light_calls")
async def test_restyle_timeout(hass: HomeAssistant, ai_task_entity: FakeAITask) -> None:
    """Test a slow rewrite keeps the original reply."""
    ai_task_entity.data = {"text": "Ta-da!", "emotion": "Grinning"}
    ai_task_entity.delay = 1
    result = await _converse(hass, "turn on the kitchen light")

    assert _speech(result) == "Turned on the light"
    assert _emotion(hass) == ("Happy", "local")
    state = hass.states.get(SENSOR)
    assert state is not None
    assert state.attributes["restyle"] == "timeout"
    assert state.attributes["timings_ms"]["ai_task"] >= 10


@pytest.mark.parametrize(
    ("original", "rewrite", "expected"),
    [
        ("Turned on the light", "Light on, boss!", RestyleResult.APPLIED),
        ("It is 21.5 °C", "Cozy, 21,5 °C inside", RestyleResult.APPLIED),
        ("It is 21.5 °C", "Cozy inside", RestyleResult.REJECTED_NUMBERS),
        ("3 lights are on", "Three lights are on", RestyleResult.REJECTED_NUMBERS),
        # A short reply has room for some personality
        ("Allumé", "Hop, et la lumière fut !", RestyleResult.APPLIED),
        ("Allumé", "x" * 90, RestyleResult.APPLIED),
        ("Allumé", "x" * 91, RestyleResult.REJECTED_LENGTH),
        # A long reply can grow 2.5 times
        ("y" * 40, "x" * 100, RestyleResult.APPLIED),
        ("y" * 40, "x" * 101, RestyleResult.REJECTED_LENGTH),
        ("Done", "   ", RestyleResult.ERROR),
    ],
)
def test_check_rewrite(original: str, rewrite: str, expected: RestyleResult) -> None:
    """Test the checks of a rewrite."""
    assert check_rewrite(original, rewrite) is expected


@pytest.mark.parametrize(
    ("data", "expected"),
    [
        ("Hop, et la lumière fut !", "Hop, et la lumière fut !"),
        ('"Ta-da!"', "Ta-da!"),
        ("« Hop ! »\n", "Hop !"),
        ("[emotion:Happy] Ta-da!", "Ta-da!"),
        ("Ta-da,\nlet there be light!", "Ta-da, let there be light!"),
    ],
)
def test_clean_rewrite(data: str, expected: str) -> None:
    """Test the rewrite is kept on one line without quotes or tags."""
    assert clean_rewrite(data) == expected


@pytest.mark.parametrize("options", [LOCAL_ONLY])
@pytest.mark.usefixtures("config_entry", "light_calls")
async def test_rules_failure_returns_reply(
    hass: HomeAssistant, caplog: pytest.LogCaptureFixture
) -> None:
    """Test an error in Casita returns the reply of the agent unchanged."""
    caplog.set_level(logging.INFO, logger="custom_components.casita")
    with patch(
        "custom_components.casita.conversation.pick_emotion",
        side_effect=RuntimeError("boom"),
    ):
        result = await _converse(hass, "turn on the kitchen light")

    assert _speech(result) == "Turned on the light"
    assert result.response.response_type is intent.IntentResponseType.ACTION_DONE
    assert _emotion(hass) == ("Normal", "fallback")
    assert "returning it unchanged" in caplog.text
    assert "Traceback" not in caplog.text


@pytest.mark.usefixtures("config_entry")
async def test_parsing_failure_returns_reply(
    hass: HomeAssistant, llm_agent: FakeLLMAgent
) -> None:
    """Test an error while parsing the LLM reply returns it unchanged."""
    llm_agent.reply = "[emotion:Happy] Hi"
    with patch(
        "custom_components.casita.conversation.extract_emotion_tag",
        side_effect=RuntimeError("boom"),
    ):
        result = await _converse(hass, "tell me about owls")

    assert _speech(result) == "[emotion:Happy] Hi"
    assert _emotion(hass) == ("Normal", "fallback")


@pytest.mark.usefixtures("config_entry")
async def test_sensor_and_event(hass: HomeAssistant, llm_agent: FakeLLMAgent) -> None:
    """Test the emotion is exposed by the sensor and an event."""
    state = hass.states.get(SENSOR)
    assert state is not None
    assert state.state == "Normal"
    assert state.attributes["source"] is None
    assert state.attributes["path"] is None
    assert len(state.attributes["options"]) == 28

    events = async_capture_events(hass, EVENT_CASITA_EMOTION)
    llm_agent.reply = "[emotion:WinkingSmile] Bonjour toi !"
    result = await _converse(hass, "salut")
    await hass.async_block_till_done()

    assert len(events) == 1
    data = events[0].data
    updated = data.pop("updated")
    timings = data.pop("timings_ms")
    assert data == {
        "emotion": "WinkingSmile",
        "source": "llm",
        "text": "Bonjour toi !",
        "agent_id": CASITA,
        "conversation_id": result.conversation_id,
        "device_id": "satellite_device",
        "emotion_source": "llm_tag",
        "path": "llm",
        "restyle": "off",
        "local_result": {
            "result": "no_match",
            "language": "en",
            "intent": None,
            "slots": None,
            "error_code": None,
        },
    }
    assert set(timings) == {"local", "llm", "ai_task", "total"}
    assert timings["ai_task"] is None
    assert timings["total"] >= timings["llm"] >= 0

    state = hass.states.get(SENSOR)
    assert state is not None
    assert state.state == "WinkingSmile"
    assert state.attributes["source"] == "llm"
    assert state.attributes["text"] == "Bonjour toi !"
    assert state.attributes["agent_id"] == CASITA
    assert state.attributes["conversation_id"] == result.conversation_id
    assert state.attributes["device_id"] == "satellite_device"
    assert state.attributes["updated"] == updated
    assert state.attributes["path"] == "llm"


@pytest.mark.usefixtures("config_entry")
async def test_streamed_reply_hides_tag(
    hass: HomeAssistant, llm_agent: FakeLLMAgent
) -> None:
    """Test the tag never reaches a pipeline streaming the reply to TTS."""
    llm_agent.chunks = ["[emo", "tion:Hap", "py] Hello", " there", "!"]
    deltas: list[dict] = []

    def pipeline_listener(chat_log: conversation.ChatLog, delta: dict) -> None:
        deltas.append(delta)

    text = "tell me about owls"
    context = Context()
    try:
        # Home Assistant 2026.11 wants the context of the caller
        session_manager = chat_session.async_get_chat_session(hass, context=context)
    except TypeError:
        session_manager = chat_session.async_get_chat_session(hass)
    with (
        session_manager as session,
        conversation.async_get_chat_log(
            hass,
            session,
            conversation.ConversationInput(
                text=text,
                context=context,
                conversation_id=session.conversation_id,
                device_id=None,
                satellite_id=None,
                language="en",
                agent_id=CASITA,
            ),
            chat_log_delta_listener=pipeline_listener,
        ) as chat_log,
    ):
        result = await conversation.async_converse(
            hass,
            text,
            session.conversation_id,
            context,
            language="en",
            agent_id=CASITA,
        )
        assert chat_log.delta_listener is pipeline_listener

    assert _speech(result) == "Hello there!"
    assert _emotion(hass) == ("Happy", "llm")
    assert deltas[0] == {"role": "assistant"}
    assert "".join(delta.get("content", "") for delta in deltas) == "Hello there!"


@pytest.mark.usefixtures("llm_agent")
@pytest.mark.parametrize(
    ("options", "streaming", "languages"),
    [
        ({CONF_LLM_AGENT: LLM_AGENT_ID}, True, "*"),
        (LOCAL_ONLY, False, None),
    ],
)
async def test_agent_info(
    hass: HomeAssistant,
    config_entry: MockConfigEntry,
    streaming: bool,
    languages: str | None,
) -> None:
    """Test Casita streams and speaks like the agents it relies on."""
    info = conversation.async_get_agent_info(hass, CASITA)
    assert info is not None
    assert info.supports_streaming is streaming

    supported = conversation.async_get_conversation_languages(hass, CASITA)
    if languages is None:
        assert "en" in supported
        assert "fr" in supported
    else:
        assert supported == languages


async def test_unload(hass: HomeAssistant, config_entry: MockConfigEntry) -> None:
    """Test unloading the config entry."""
    assert await hass.config_entries.async_unload(config_entry.entry_id)
    await hass.async_block_till_done()
    state = hass.states.get(CASITA)
    assert state is not None
    assert state.state == "unavailable"


async def test_diagnostic_sensors(
    hass: HomeAssistant,
    config_entry: MockConfigEntry,
    llm_agent: FakeLLMAgent,
    light_calls: list[ServiceCall],
    entity_registry: er.EntityRegistry,
) -> None:
    """Test the sensors showing how the last reply was made."""
    keys = {
        "last_path": "sensor.casita_last_path",
        "last_local_result": "sensor.casita_last_local_result",
        "last_restyle": "sensor.casita_last_restyle",
        "last_duration": "sensor.casita_last_reply_duration",
        "last_local_duration": "sensor.casita_last_local_duration",
        "last_llm_duration": "sensor.casita_last_llm_duration",
        "last_ai_task_duration": "sensor.casita_last_ai_task_duration",
        "last_original_text": "sensor.casita_last_original_text",
    }
    for entity_id in keys.values():
        entry = entity_registry.async_get(entity_id)
        assert entry is not None
        assert entry.entity_category is EntityCategory.DIAGNOSTIC
        assert entry.disabled_by is None
        state = hass.states.get(entity_id)
        assert state is not None
        assert state.state == "unknown"
    duration = hass.states.get("sensor.casita_last_llm_duration")
    assert duration is not None
    assert duration.attributes["device_class"] == "duration"
    assert duration.attributes["unit_of_measurement"] == "ms"
    assert duration.attributes["state_class"] == "measurement"

    def value(key: str) -> str:
        state = hass.states.get(keys[key])
        assert state is not None
        return state.state

    await _converse(hass, "turn on the kitchen light")
    assert value("last_path") == "local"
    assert value("last_local_result") == "matched"
    assert value("last_restyle") == "off"
    assert float(value("last_duration")) >= float(value("last_local_duration")) >= 0
    # Steps that did not happen are unknown, not 0
    assert value("last_llm_duration") == "unknown"
    assert value("last_ai_task_duration") == "unknown"
    assert value("last_original_text") == "Turned on the light"

    llm_agent.reply = "[emotion:Happy] " + "Owls! " * 60
    await _converse(hass, "tell me about owls")
    assert value("last_path") == "llm"
    assert value("last_local_result") == "no_match"
    assert float(value("last_llm_duration")) >= 0
    assert value("last_original_text") == "unknown"

    # The text of the emotion sensor is the reply, long or not
    state = hass.states.get(SENSOR)
    assert state is not None
    assert len(state.attributes["text"]) > 255

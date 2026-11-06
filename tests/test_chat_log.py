"""Tests keeping emotion tags out of the chat log."""

import json
from typing import Any

import pytest

from custom_components.casita.const import (
    CONF_AI_TASK_ENTITY,
    CONF_EMOTION_FALLBACK_AI_TASK,
    CONF_LLM_AGENT,
)
from homeassistant.components import conversation
from homeassistant.components.conversation.chat_log import (
    DATA_CHAT_LOGS,
    async_subscribe_chat_logs,
)
from homeassistant.core import Context, HomeAssistant, callback
from homeassistant.helpers.json import JSONEncoder

from .conftest import AI_TASK_ENTITY_ID, LLM_AGENT_ID, FakeAITask, FakeLLMAgent

CASITA = "conversation.casita"
SENSOR = "sensor.casita_emotion"


@pytest.fixture
def chat_log_events(hass: HomeAssistant) -> list[dict[str, Any]]:
    """Record what subscribers of chat logs see, like the Assist debug view."""
    events: list[dict[str, Any]] = []

    @callback
    def record(conversation_id: str, event_type: str, data: dict[str, Any]) -> None:
        events.append({"type": event_type, "data": data})

    async_subscribe_chat_logs(hass, record)
    return events


def _seen_assistant_content(events: list[dict[str, Any]]) -> str:
    """Return the assistant content subscribers saw, as JSON.

    The system prompt asks for the tag, so it is left out. Home Assistant
    2026.10 only tells subscribers about streamed content at the end of a turn.
    """
    contents: list[dict[str, Any]] = []
    for event in events:
        data = event["data"]
        if "content" in data:
            contents.append(data["content"])
        if "chat_log" in data:
            contents.extend(data["chat_log"]["content"])
    assert contents
    return json.dumps(
        [content for content in contents if content["role"] == "assistant"],
        cls=JSONEncoder,
    )


def _assistant_texts(hass: HomeAssistant, conversation_id: str) -> list[str | None]:
    chat_log = hass.data[DATA_CHAT_LOGS][conversation_id]
    return [
        content.content
        for content in chat_log.content
        if isinstance(content, conversation.AssistantContent)
    ]


async def _converse(hass: HomeAssistant, text: str) -> conversation.ConversationResult:
    return await conversation.async_converse(
        hass, text, None, Context(), language="en", agent_id=CASITA
    )


@pytest.mark.usefixtures("config_entry")
@pytest.mark.parametrize("streamed", [False, True])
async def test_llm_reply_without_tag_in_chat_log(
    hass: HomeAssistant,
    llm_agent: FakeLLMAgent,
    chat_log_events: list[dict[str, Any]],
    streamed: bool,
) -> None:
    """Test the tag is in no content of the chat log and no event about it."""
    if streamed:
        llm_agent.chunks = ["[emotion:", "Problem] Oops, ", "my mistake."]
    else:
        llm_agent.reply = "[emotion:Problem] Oops, my mistake."
    result = await _converse(hass, "you got it wrong")

    assert result.response.speech["plain"]["speech"] == "Oops, my mistake."
    assert _assistant_texts(hass, result.conversation_id) == ["Oops, my mistake."]
    assert "[emotion" not in _seen_assistant_content(chat_log_events)
    state = hass.states.get(SENSOR)
    assert state is not None
    assert state.state == "Problem"
    assert state.attributes["source"] == "llm"


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
async def test_tag_of_an_earlier_message(
    hass: HomeAssistant,
    llm_agent: FakeLLMAgent,
    ai_task_entity: FakeAITask,
    chat_log_events: list[dict[str, Any]],
) -> None:
    """Test a tag before a tool call gives the emotion of the whole turn.

    The AI Task is not asked for an emotion when the turn has a tag.
    """
    llm_agent.deltas = [
        {"role": "assistant", "thinking_content": "The user wants light."},
        {"content": "[emotion:Grinning] On it."},
        {"role": "assistant"},
        {"content": "The office is lit."},
    ]
    result = await _converse(hass, "light up the office")
    await hass.async_block_till_done()

    assert result.response.speech["plain"]["speech"] == "The office is lit."
    assert _assistant_texts(hass, result.conversation_id) == [
        "On it.",
        "The office is lit.",
    ]
    assert "[emotion" not in _seen_assistant_content(chat_log_events)
    assert ai_task_entity.tasks == []
    state = hass.states.get(SENSOR)
    assert state is not None
    assert state.state == "Grinning"
    assert state.attributes["source"] == "llm"
    assert state.attributes["timings_ms"]["ai_task"] is None


@pytest.mark.usefixtures("config_entry")
async def test_only_a_tag_before_a_tool_call(
    hass: HomeAssistant, llm_agent: FakeLLMAgent
) -> None:
    """Test a message with only a tag and thinking keeps no empty text."""
    llm_agent.deltas = [
        {"role": "assistant", "thinking_content": "Hmm."},
        {"content": "[emotion:Focusing]"},
        {"role": "assistant", "content": "Let me think."},
    ]
    result = await _converse(hass, "think about it")

    assert _assistant_texts(hass, result.conversation_id) == [None, "Let me think."]
    state = hass.states.get(SENSOR)
    assert state is not None
    assert state.state == "Focusing"

"""Fixtures for Casita tests."""

import asyncio
from collections.abc import AsyncIterator, Iterator
from typing import Any, Literal, override
from unittest.mock import patch

import pytest
from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    async_mock_service,
)

from custom_components.casita.const import CONF_LLM_AGENT, CONF_LOCAL_FIRST, DOMAIN
from custom_components.casita.conversation import CasitaConversationEntity
from homeassistant.components import ai_task, conversation
from homeassistant.components.ai_task.const import DATA_COMPONENT as AI_TASK_COMPONENT
from homeassistant.components.conversation.const import (
    DATA_COMPONENT as CONVERSATION_COMPONENT,
)
from homeassistant.components.homeassistant.exposed_entities import async_expose_entity
from homeassistant.const import MATCH_ALL
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.setup import async_setup_component

LLM_AGENT_ID = "conversation.fake_llm"
AI_TASK_ENTITY_ID = "ai_task.fake_ai_task"


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations: None) -> None:
    """Enable the Casita custom integration in every test."""


@pytest.fixture(autouse=True)
def usual_emotions() -> Iterator[None]:
    """Let the rules show the usual emotion instead of drawing one."""
    with patch.object(CasitaConversationEntity, "rng", None):
        yield


class FakeLLMAgent(conversation.ConversationEntity):
    """LLM agent that answers with a fixed reply and records its input."""

    _attr_name = "Fake LLM"
    _attr_supported_features = conversation.ConversationEntityFeature.CONTROL
    _attr_supports_streaming = True

    def __init__(self) -> None:
        """Initialize the agent."""
        self.reply = "[emotion:Happy] Hello from the LLM"
        self.chunks: list[str] | None = None
        self.deltas: list[dict[str, Any]] | None = None
        self.inputs: list[conversation.ConversationInput] = []
        self.system_prompts: list[str] = []
        self.histories: list[list[conversation.Content]] = []

    @property
    @override
    def supported_languages(self) -> Literal["*"]:
        """Return the supported languages."""
        return MATCH_ALL

    @override
    async def _async_handle_message(
        self,
        user_input: conversation.ConversationInput,
        chat_log: conversation.ChatLog,
    ) -> conversation.ConversationResult:
        """Answer like an LLM integration does."""
        self.inputs.append(user_input)
        await chat_log.async_provide_llm_data(
            user_input.as_llm_context("fake_llm"),
            None,
            None,
            user_input.extra_system_prompt,
        )
        self.system_prompts.append(chat_log.content[0].content)
        self.histories.append(list(chat_log.content))
        if self.deltas is not None:
            async for _ in chat_log.async_add_delta_content_stream(
                user_input.agent_id, self._async_deltas(self.deltas)
            ):
                pass
        elif self.chunks is None:
            chat_log.async_add_assistant_content_without_tools(
                conversation.AssistantContent(
                    agent_id=user_input.agent_id, content=self.reply
                )
            )
        else:
            async for _ in chat_log.async_add_delta_content_stream(
                user_input.agent_id, self._async_stream(self.chunks)
            ):
                pass
        return conversation.async_get_result_from_chat_log(user_input, chat_log)

    @staticmethod
    async def _async_stream(chunks: list[str]) -> AsyncIterator[dict[str, Any]]:
        yield {"role": "assistant"}
        for chunk in chunks:
            yield {"content": chunk}

    @staticmethod
    async def _async_deltas(
        deltas: list[dict[str, Any]],
    ) -> AsyncIterator[dict[str, Any]]:
        for delta in deltas:
            yield delta


class FakeAITask(ai_task.AITaskEntity):
    """AI Task entity returning fixed data."""

    _attr_name = "Fake AI Task"
    _attr_supported_features = ai_task.AITaskEntityFeature.GENERATE_DATA

    def __init__(self) -> None:
        """Initialize the entity."""
        self.data: Any = {"text": "", "emotion": "Normal"}
        self.delay = 0.0
        self.tasks: list[ai_task.GenDataTask] = []

    @override
    async def _async_generate_data(
        self, task: ai_task.GenDataTask, chat_log: conversation.ChatLog
    ) -> ai_task.GenDataTaskResult:
        """Return the fixed data."""
        self.tasks.append(task)
        if self.delay:
            await asyncio.sleep(self.delay)
        return ai_task.GenDataTaskResult(
            conversation_id=chat_log.conversation_id, data=self.data
        )


@pytest.fixture
async def setup_ha(hass: HomeAssistant) -> None:
    """Set up the local agent with a few exposed entities."""
    assert await async_setup_component(hass, "homeassistant", {})
    assert await async_setup_component(hass, "conversation", {})
    assert await async_setup_component(hass, "intent", {})
    for entity_id, state, attributes in (
        ("light.kitchen", "off", {"friendly_name": "Kitchen light"}),
        ("cover.garage", "open", {"friendly_name": "Garage door"}),
        ("lock.front_door", "unlocked", {"friendly_name": "Front door"}),
    ):
        hass.states.async_set(entity_id, state, attributes)
        async_expose_entity(hass, conversation.DOMAIN, entity_id, True)


@pytest.fixture
def light_calls(hass: HomeAssistant) -> list[ServiceCall]:
    """Mock the light services."""
    calls = async_mock_service(hass, "light", "turn_on")
    calls += async_mock_service(hass, "light", "turn_off")
    return calls


@pytest.fixture
async def llm_agent(hass: HomeAssistant, setup_ha: None) -> FakeLLMAgent:
    """Register a fake LLM conversation agent."""
    agent = FakeLLMAgent()
    agent.entity_id = LLM_AGENT_ID
    await hass.data[CONVERSATION_COMPONENT].async_add_entities([agent])
    return agent


@pytest.fixture
async def ai_task_entity(hass: HomeAssistant, setup_ha: None) -> FakeAITask:
    """Register a fake AI Task entity."""
    assert await async_setup_component(hass, ai_task.DOMAIN, {})
    entity = FakeAITask()
    entity.entity_id = AI_TASK_ENTITY_ID
    await hass.data[AI_TASK_COMPONENT].async_add_entities([entity])
    return entity


@pytest.fixture
def options() -> dict[str, Any]:
    """Return the options of the config entry."""
    return {CONF_LLM_AGENT: LLM_AGENT_ID, CONF_LOCAL_FIRST: True}


@pytest.fixture
async def config_entry(
    hass: HomeAssistant, setup_ha: None, options: dict[str, Any]
) -> MockConfigEntry:
    """Set up Casita."""
    entry = MockConfigEntry(domain=DOMAIN, title="Casita", options=options)
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry

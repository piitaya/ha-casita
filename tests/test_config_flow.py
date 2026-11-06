"""Tests for the Casita config flow."""

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.casita.const import (
    CONF_AI_TASK_ENTITY,
    CONF_EMOTION_FALLBACK_AI_TASK,
    CONF_EXTRA_PERSONALITY,
    CONF_LLM_AGENT,
    CONF_LOCAL_FIRST,
    CONF_RESTYLE_LOCAL,
    CONF_RESTYLE_TIMEOUT,
    CONF_WEATHER_ENTITY,
    DOMAIN,
)
from homeassistant.config_entries import SOURCE_USER
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType, InvalidData

from .conftest import AI_TASK_ENTITY_ID, LLM_AGENT_ID, FakeAITask, FakeLLMAgent


@pytest.mark.usefixtures("llm_agent", "ai_task_entity")
async def test_user_flow(hass: HomeAssistant) -> None:
    """Test creating an entry."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": SOURCE_USER}
    )
    assert result["type"] is FlowResultType.FORM
    assert result["step_id"] == "user"
    assert result["errors"] == {}

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            CONF_LLM_AGENT: LLM_AGENT_ID,
            CONF_AI_TASK_ENTITY: AI_TASK_ENTITY_ID,
            CONF_RESTYLE_LOCAL: True,
            CONF_EXTRA_PERSONALITY: "You call the user captain.",
            CONF_WEATHER_ENTITY: "weather.home",
        },
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["title"] == "Casita"
    assert result["data"] == {}
    assert result["options"] == {
        CONF_LLM_AGENT: LLM_AGENT_ID,
        CONF_LOCAL_FIRST: True,
        CONF_AI_TASK_ENTITY: AI_TASK_ENTITY_ID,
        CONF_RESTYLE_LOCAL: True,
        CONF_RESTYLE_TIMEOUT: 1.5,
        CONF_EMOTION_FALLBACK_AI_TASK: False,
        CONF_EXTRA_PERSONALITY: "You call the user captain.",
        CONF_WEATHER_ENTITY: "weather.home",
    }
    await hass.async_block_till_done()
    assert hass.states.get("conversation.casita") is not None
    assert hass.states.get("sensor.casita_emotion") is not None
    assert hass.states.get("sensor.casita_joy") is not None


@pytest.mark.usefixtures("setup_ha")
async def test_user_flow_local_only(hass: HomeAssistant) -> None:
    """Test creating an entry without any LLM."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["options"] == {
        CONF_LOCAL_FIRST: True,
        CONF_RESTYLE_LOCAL: False,
        CONF_RESTYLE_TIMEOUT: 1.5,
        CONF_EMOTION_FALLBACK_AI_TASK: False,
    }


@pytest.mark.parametrize("option", [CONF_RESTYLE_LOCAL, CONF_EMOTION_FALLBACK_AI_TASK])
@pytest.mark.usefixtures("ai_task_entity")
async def test_user_flow_ai_task_required(hass: HomeAssistant, option: str) -> None:
    """Test the AI Task options need an AI Task entity."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {option: True}
    )
    assert result["type"] is FlowResultType.FORM
    assert result["errors"] == {CONF_AI_TASK_ENTITY: "ai_task_required"}

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {option: True, CONF_AI_TASK_ENTITY: AI_TASK_ENTITY_ID}
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY


@pytest.mark.parametrize(
    "agent_id", ["conversation.casita", "conversation.home_assistant"]
)
async def test_options_flow_excludes_agents(
    hass: HomeAssistant, config_entry: MockConfigEntry, agent_id: str
) -> None:
    """Test Casita cannot delegate to itself or to the local agent."""
    result = await hass.config_entries.options.async_init(config_entry.entry_id)
    with pytest.raises(InvalidData):
        await hass.config_entries.options.async_configure(
            result["flow_id"], {CONF_LLM_AGENT: agent_id}
        )


async def test_options_flow(
    hass: HomeAssistant,
    config_entry: MockConfigEntry,
    llm_agent: FakeLLMAgent,
    ai_task_entity: FakeAITask,
) -> None:
    """Test changing the options."""
    result = await hass.config_entries.options.async_init(config_entry.entry_id)
    assert result["type"] is FlowResultType.FORM
    assert result["step_id"] == "init"

    result = await hass.config_entries.options.async_configure(
        result["flow_id"],
        {CONF_LOCAL_FIRST: False, CONF_EMOTION_FALLBACK_AI_TASK: True},
    )
    assert result["type"] is FlowResultType.FORM
    assert result["errors"] == {CONF_AI_TASK_ENTITY: "ai_task_required"}

    result = await hass.config_entries.options.async_configure(
        result["flow_id"],
        {
            CONF_LOCAL_FIRST: False,
            CONF_AI_TASK_ENTITY: AI_TASK_ENTITY_ID,
            CONF_EMOTION_FALLBACK_AI_TASK: True,
            CONF_RESTYLE_TIMEOUT: 3,
        },
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    # Clearing the LLM agent makes Casita local only
    assert config_entry.options == {
        CONF_LOCAL_FIRST: False,
        CONF_AI_TASK_ENTITY: AI_TASK_ENTITY_ID,
        CONF_RESTYLE_LOCAL: False,
        CONF_RESTYLE_TIMEOUT: 3,
        CONF_EMOTION_FALLBACK_AI_TASK: True,
    }

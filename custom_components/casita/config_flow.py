"""Config flow for Casita."""

from collections.abc import Mapping
from typing import Any, override

import probatio

from homeassistant.components import ai_task, conversation
from homeassistant.config_entries import (
    ConfigEntry,
    ConfigFlow,
    ConfigFlowResult,
    OptionsFlow,
)
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.selector import (
    BooleanSelector,
    EntitySelector,
    EntitySelectorConfig,
    EntityWithDeviceFilterSelectorConfig,
    NumberSelector,
    NumberSelectorConfig,
    NumberSelectorMode,
    TextSelector,
    TextSelectorConfig,
)

from .const import (
    CONF_AI_TASK_ENTITY,
    CONF_EMOTION_FALLBACK_AI_TASK,
    CONF_EXTRA_PERSONALITY,
    CONF_LLM_AGENT,
    CONF_LOCAL_FIRST,
    CONF_RESTYLE_LOCAL,
    CONF_RESTYLE_TIMEOUT,
    CONF_WEATHER_ENTITY,
    DEFAULT_EMOTION_FALLBACK_AI_TASK,
    DEFAULT_LOCAL_FIRST,
    DEFAULT_RESTYLE_LOCAL,
    DEFAULT_RESTYLE_TIMEOUT,
    DEFAULT_TITLE,
    DOMAIN,
)

_GENERATE_DATA_FEATURE = (
    f"{ai_task.DOMAIN}.AITaskEntityFeature."
    f"{ai_task.AITaskEntityFeature.GENERATE_DATA.name}"
)


@callback
def _async_excluded_agents(hass: HomeAssistant) -> list[str]:
    """Return the agents Casita cannot delegate to: itself and the local agent."""
    entity_registry = er.async_get(hass)
    return [
        conversation.HOME_ASSISTANT_AGENT,
        *(
            entry.entity_id
            for entry in entity_registry.entities.values()
            if entry.platform == DOMAIN and entry.domain == conversation.DOMAIN
        ),
    ]


@callback
def _async_options_schema(hass: HomeAssistant) -> probatio.Schema:
    """Return the schema of the Casita options."""
    return probatio.Schema(
        {
            probatio.Optional(CONF_LLM_AGENT): EntitySelector(
                EntitySelectorConfig(
                    filter=EntityWithDeviceFilterSelectorConfig(
                        domain=conversation.DOMAIN
                    ),
                    exclude_entities=_async_excluded_agents(hass),
                )
            ),
            probatio.Optional(
                CONF_LOCAL_FIRST, default=DEFAULT_LOCAL_FIRST
            ): BooleanSelector(),
            probatio.Optional(CONF_AI_TASK_ENTITY): EntitySelector(
                EntitySelectorConfig(
                    filter=EntityWithDeviceFilterSelectorConfig(
                        domain=ai_task.DOMAIN,
                        supported_features=[_GENERATE_DATA_FEATURE],
                    )
                )
            ),
            probatio.Optional(
                CONF_RESTYLE_LOCAL, default=DEFAULT_RESTYLE_LOCAL
            ): BooleanSelector(),
            probatio.Optional(
                CONF_RESTYLE_TIMEOUT, default=DEFAULT_RESTYLE_TIMEOUT
            ): NumberSelector(
                NumberSelectorConfig(
                    min=0.5,
                    max=10,
                    step=0.1,
                    unit_of_measurement="s",
                    mode=NumberSelectorMode.BOX,
                )
            ),
            probatio.Optional(
                CONF_EMOTION_FALLBACK_AI_TASK, default=DEFAULT_EMOTION_FALLBACK_AI_TASK
            ): BooleanSelector(),
            probatio.Optional(CONF_EXTRA_PERSONALITY): TextSelector(
                TextSelectorConfig(multiline=True)
            ),
            probatio.Optional(CONF_WEATHER_ENTITY): EntitySelector(
                EntitySelectorConfig(
                    filter=EntityWithDeviceFilterSelectorConfig(domain="weather")
                )
            ),
        }
    )


def _validate_options(options: Mapping[str, Any]) -> dict[str, str]:
    """Return the errors of the options."""
    errors: dict[str, str] = {}
    if not options.get(CONF_AI_TASK_ENTITY) and (
        options.get(CONF_RESTYLE_LOCAL) or options.get(CONF_EMOTION_FALLBACK_AI_TASK)
    ):
        errors[CONF_AI_TASK_ENTITY] = "ai_task_required"
    return errors


class CasitaConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Casita."""

    VERSION = 1
    MINOR_VERSION = 1

    @staticmethod
    @callback
    @override
    def async_get_options_flow(config_entry: ConfigEntry) -> CasitaOptionsFlow:
        """Return the options flow."""
        return CasitaOptionsFlow()

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Handle the initial step."""
        errors: dict[str, str] = {}
        if user_input is not None and not (errors := _validate_options(user_input)):
            return self.async_create_entry(
                title=DEFAULT_TITLE, data={}, options=user_input
            )
        return self.async_show_form(
            step_id="user",
            data_schema=self.add_suggested_values_to_schema(
                _async_options_schema(self.hass), user_input
            ),
            errors=errors,
        )


class CasitaOptionsFlow(OptionsFlow):
    """Handle the options of Casita.

    Options are read on every request, so no reload is needed.
    """

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Manage the options."""
        errors: dict[str, str] = {}
        if user_input is not None and not (errors := _validate_options(user_input)):
            return self.async_create_entry(data=user_input)
        return self.async_show_form(
            step_id="init",
            data_schema=self.add_suggested_values_to_schema(
                _async_options_schema(self.hass),
                user_input if user_input is not None else self.config_entry.options,
            ),
            errors=errors,
        )

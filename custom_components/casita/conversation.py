"""Conversation agent giving Casita a voice and a face."""

import asyncio
from collections.abc import AsyncGenerator, Callable, Mapping
from dataclasses import dataclass, replace
import logging
import random
import re
import time
from typing import TYPE_CHECKING, Any, Literal, Self, override

import probatio

from homeassistant.components import ai_task, conversation
from homeassistant.const import MATCH_ALL, EntityStateAttribute
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import intent, selector
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback
from homeassistant.util import dt as dt_util, language as language_util

from .const import (
    CONF_AI_TASK_ENTITY,
    CONF_EMOTION_FALLBACK_AI_TASK,
    CONF_EXTRA_PERSONALITY,
    CONF_LLM_AGENT,
    CONF_LOCAL_FIRST,
    CONF_RESTYLE_LOCAL,
    CONF_RESTYLE_TIMEOUT,
    DEFAULT_EMOTION_FALLBACK_AI_TASK,
    DEFAULT_LOCAL_FIRST,
    DEFAULT_RESTYLE_LOCAL,
    DEFAULT_RESTYLE_TIMEOUT,
    DOMAIN,
    EMOTION_FALLBACK_TIMEOUT,
    LOGGER,
    RESTYLE_MAX_LENGTH_RATIO,
    RESTYLE_MIN_MAX_LENGTH,
)
from .emotion import (
    EMOTIONS,
    Emotion,
    EmotionOrigin,
    EmotionSource,
    EmotionTagStreamFilter,
    EmotionUpdate,
    LocalMatch,
    LocalResult,
    PreviousTurn,
    ReplyDetails,
    ReplyPath,
    RestyleResult,
    RuleContext,
    async_publish_emotion,
    emotion_from_user_text,
    extract_emotion_tag,
    is_insult,
    parse_emotion,
    pick_emotion,
    response_has_details,
    response_slots,
)
from .entity import CasitaEntity
from .models import CasitaConfigEntry
from .prompts import (
    PromptLanguage,
    build_casita_prompt,
    build_emotion_prompt,
    build_llm_prompt,
    build_restyle_prompt,
    prompt_language,
)

if TYPE_CHECKING:
    from hassil.recognize import RecognizeResult

PARALLEL_UPDATES = 0

# Intents the pipeline leaves to an LLM that can control the home
_LLM_PREFERRED_INTENTS = frozenset({intent.INTENT_GET_STATE, "HassMediaSearchAndPlay"})

_NUMBER = re.compile(r"\d+(?:[.,]\d+)?")
# Quotes and spaces around a rewrite
_QUOTES = "\"'\u00ab\u00bb\u201c\u201d\u2018\u2019 \n\t"

_EMOTION_SELECTOR = selector.SelectSelector(
    selector.SelectSelectorConfig(options=list(EMOTIONS))
)
_RESTYLE_STRUCTURE = probatio.Schema(
    {
        probatio.Required(
            "text", description="The reply in one short sentence"
        ): selector.TextSelector(),
        probatio.Required(
            "emotion", description="The expression Casita shows with the reply"
        ): _EMOTION_SELECTOR,
    }
)
_EMOTION_STRUCTURE = probatio.Schema(
    {
        probatio.Required(
            "emotion", description="The expression Casita shows with the reply"
        ): _EMOTION_SELECTOR,
    }
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: CasitaConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up the Casita conversation agent."""
    async_add_entities([CasitaConversationEntity(entry)])


def check_rewrite(original: str, rewrite: str) -> RestyleResult:
    """Return if a rewrite can replace the original reply.

    Every number must survive. The rewrite may not be longer than 90 characters
    or 2.5 times the original, whichever is longer, so a short "Turned on" can
    get some personality.
    """
    if not rewrite.strip():
        return RestyleResult.ERROR
    max_length = max(RESTYLE_MIN_MAX_LENGTH, RESTYLE_MAX_LENGTH_RATIO * len(original))
    if len(rewrite) > max_length:
        return RestyleResult.REJECTED_LENGTH
    rewrite_numbers = {number.replace(",", ".") for number in _NUMBER.findall(rewrite)}
    if not all(
        number.replace(",", ".") in rewrite_numbers
        for number in _NUMBER.findall(original)
    ):
        return RestyleResult.REJECTED_NUMBERS
    return RestyleResult.APPLIED


def clean_rewrite(text: str) -> str:
    """Return the rewrite on one line, without tags and surrounding quotes."""
    text = extract_emotion_tag(text).text
    return " ".join(text.split()).strip(_QUOTES)


def _get_speech(response: intent.IntentResponse) -> str:
    return str(response.speech.get("plain", {}).get("speech") or "")


def _get_area(response: intent.IntentResponse) -> str | None:
    """Return the area a local command acted on, if any."""
    for target in response.success_results:
        if target.type is intent.IntentResponseTargetType.AREA:
            return target.name
    return None


def _elapsed_ms(start: float) -> int:
    return round((time.monotonic() - start) * 1000)


def _json_value(value: Any) -> Any:
    """Return a slot value that can be shown in an attribute."""
    if value is None or isinstance(value, str | int | float | bool):
        return value
    if isinstance(value, list | tuple):
        return [_json_value(item) for item in value]
    return str(value)


def _local_match_from_response(
    response: intent.IntentResponse, language: str | None
) -> LocalMatch:
    """Return what the local agent made of the input, from its response."""
    if response.error_code is None:
        result = LocalResult.MATCHED
    elif response.error_code is intent.IntentResponseErrorCode.NO_INTENT_MATCH:
        result = LocalResult.NO_MATCH
    elif response.error_code is intent.IntentResponseErrorCode.NO_VALID_TARGETS:
        result = LocalResult.NO_VALID_TARGETS
    else:
        result = LocalResult.OTHER_ERROR
    return LocalMatch(
        result=result,
        language=language,
        intent=response.intent.intent_type if response.intent else None,
        slots=(
            {
                name: _json_value(slot.get("value"))
                for name, slot in response.intent.slots.items()
            }
            if response.intent
            else None
        ),
        error_code=response.error_code.value if response.error_code else None,
    )


@dataclass(slots=True)
class _Reply:
    """Reply of the agent Casita relied on."""

    result: conversation.ConversationResult
    path: ReplyPath
    language: str | None
    """Language of the reply. For a local command, the one that matched."""

    add_to_chat_log: bool = False
    """The local intents answered without writing the reply to the chat log."""

    emotion: Emotion | None = None
    """First valid tag the LLM agent wrote."""

    has_tag: bool = False
    local: LocalMatch | None = None
    local_ms: int | None = None
    llm_ms: int | None = None


@dataclass(slots=True)
class _Decision:
    """What Casita says and shows."""

    text: str
    emotion: Emotion
    source: EmotionSource
    origin: EmotionOrigin
    restyle: RestyleResult = RestyleResult.OFF
    ai_task_ms: int | None = None
    emotion_pending: bool = False
    """The AI Task picks the emotion once the reply is returned."""


@dataclass(frozen=True, slots=True)
class _Rewrite:
    """Rewrite of a local reply."""

    result: RestyleResult
    text: str | None = None
    emotion: Emotion | None = None
    ai_task_ms: int | None = None


class _TagFilteringDeltaListener:
    """Pass the LLM stream on to the pipeline, without the emotion tag."""

    def __init__(
        self,
        chat_log: conversation.ChatLog,
        listener: Callable[[conversation.ChatLog, dict[str, Any]], None],
    ) -> None:
        """Initialize the listener."""
        self._chat_log = chat_log
        self._listener = listener
        self._filter: EmotionTagStreamFilter | None = EmotionTagStreamFilter()

    @callback
    def __call__(self, chat_log: conversation.ChatLog, delta: dict[str, Any]) -> None:
        """Handle a delta of the chat log."""
        if self._filter is not None:
            try:
                delta = self._filter_delta(self._filter, delta)
            except Exception:  # noqa: BLE001
                LOGGER.warning("Could not filter the reply stream, passing it on")
                self._filter = None
        if delta:
            self._listener(chat_log, delta)

    @staticmethod
    def _filter_delta(
        stream_filter: EmotionTagStreamFilter, delta: dict[str, Any]
    ) -> dict[str, Any]:
        role = delta.get("role")
        if role is not None and role != "assistant":
            return delta
        if role == "assistant":
            stream_filter.start_message()
        if not (content := delta.get("content")):
            return delta
        filtered = {key: value for key, value in delta.items() if key != "content"}
        if content := stream_filter.feed(content):
            filtered["content"] = content
        return filtered

    @callback
    def async_flush(self) -> None:
        """Pass on what was held back at the end of the stream."""
        if self._filter is not None and (content := self._filter.flush()):
            self._listener(self._chat_log, {"content": content})


class _ChatLogTagStripper:
    """Keep emotion tags out of what the LLM agent writes to the chat log.

    The chat log tells its subscribers, like the debug view of Assist, about
    content as soon as it is added, so tags are removed before that. The chat
    log has no hook for it, so the two methods adding assistant content are
    wrapped on this chat log while the LLM agent answers.
    """

    _METHODS = (
        "async_add_assistant_content",
        "async_add_assistant_content_without_tools",
    )

    def __init__(self, chat_log: conversation.ChatLog) -> None:
        """Initialize the stripper."""
        self._chat_log = chat_log
        self.emotion: Emotion | None = None
        self.has_tag = False

    def __enter__(self) -> Self:
        """Start removing tags."""
        add = self._chat_log.async_add_assistant_content
        add_without_tools = self._chat_log.async_add_assistant_content_without_tools

        def add_cleaned(
            content: conversation.AssistantContent | conversation.ToolResultContent,
            /,
            tool_call_tasks: dict[str, asyncio.Task[Any]] | None = None,
        ) -> AsyncGenerator[conversation.ToolResultContent]:
            return add(self._clean(content), tool_call_tasks=tool_call_tasks)

        @callback
        def add_without_tools_cleaned(
            content: conversation.AssistantContent | conversation.ToolResultContent,
        ) -> None:
            add_without_tools(self._clean(content))

        # Instance attributes win over the methods of the class
        attributes = vars(self._chat_log)
        attributes[self._METHODS[0]] = add_cleaned
        attributes[self._METHODS[1]] = add_without_tools_cleaned
        return self

    def __exit__(self, *exc_info: object) -> None:
        """Stop removing tags."""
        attributes = vars(self._chat_log)
        for method in self._METHODS:
            attributes.pop(method, None)

    def _clean(
        self, content: conversation.AssistantContent | conversation.ToolResultContent
    ) -> conversation.AssistantContent | conversation.ToolResultContent:
        """Return the content without its emotion tags."""
        if (
            not isinstance(content, conversation.AssistantContent)
            or not content.content
        ):
            return content
        try:
            tagged = extract_emotion_tag(content.content)
        except Exception:  # noqa: BLE001
            LOGGER.warning("Could not remove the emotion tag from the chat log")
            return content
        if not tagged.has_tag:
            return content
        self.has_tag = True
        if self.emotion is None:
            self.emotion = tagged.emotion
        text: str | None = tagged.text
        if not text and (content.tool_calls or content.thinking_content):
            text = None
        return replace(content, content=text)


class CasitaConversationEntity(conversation.ConversationEntity, CasitaEntity):
    """Casita conversation agent.

    Wraps the local agent and an LLM agent, and attaches an emotion to every
    reply.
    """

    _attr_name = None
    _attr_supported_features = conversation.ConversationEntityFeature.CONTROL

    rng: random.Random | None = random.Random()
    """Draws the emotions of the rules. Without it, the usual one is shown."""

    def __init__(self, entry: CasitaConfigEntry) -> None:
        """Initialize the agent."""
        super().__init__(entry, entry.entry_id)
        self._warned_unavailable_agent: str | None = None
        self._previous: PreviousTurn | None = None

    @property
    def _options(self) -> Mapping[str, Any]:
        return self._entry.options

    @property
    @override
    def supported_languages(self) -> list[str] | Literal["*"]:
        """Return the languages of the agents Casita relies on."""
        if self._async_get_llm_agent() is not None:
            return MATCH_ALL
        if (agent := conversation.async_get_agent(self.hass)) is None:
            return MATCH_ALL
        return agent.supported_languages

    @property
    @override
    def supports_streaming(self) -> bool:
        """Return if replies are streamed, which only the LLM agent does."""
        if (agent := self._async_get_llm_agent()) is None:
            return False
        return isinstance(agent, conversation.ConversationEntity) and (
            agent.supports_streaming
        )

    @override
    async def async_prepare(self, language: str | None = None) -> None:
        """Load the intents and the LLM agent for a language."""
        if (agent := conversation.async_get_agent(self.hass)) is not None:
            for local_language in self._local_languages(language):
                await agent.async_prepare(local_language)
        if (agent := self._async_get_llm_agent()) is not None:
            await agent.async_prepare(language)

    @callback
    def _async_get_llm_agent(
        self,
    ) -> (
        conversation.AbstractConversationAgent | conversation.ConversationEntity | None
    ):
        """Return the LLM agent, if one is configured and available."""
        if not (agent_id := self._options.get(CONF_LLM_AGENT)):
            return None
        if agent_id == conversation.HOME_ASSISTANT_AGENT:
            return None
        agent = conversation.async_get_agent(self.hass, agent_id)
        if agent is None or isinstance(agent, CasitaConversationEntity):
            return None
        return agent

    def _local_languages(self, language: str | None) -> list[str]:
        """Return the languages to try local commands in.

        The Assist dialog of a conversation entity runs a pipeline Home
        Assistant makes up for it. For an agent supporting every language, that
        pipeline cannot match the language of the system and sends "en". So when
        nothing matches in another language than the one of the system, the
        language of the system is tried too.
        """
        system_language = self.hass.config.language
        if not language or language == MATCH_ALL:
            return [system_language]
        if language_util.matches(language, [system_language]):
            return [language]
        return [language, system_language]

    @override
    async def _async_handle_message(
        self,
        user_input: conversation.ConversationInput,
        chat_log: conversation.ChatLog,
    ) -> conversation.ConversationResult:
        """Answer with the local or the LLM agent, and pick an emotion."""
        start = time.monotonic()
        reply = await self._async_get_reply(user_input, chat_log)
        response = reply.result.response
        speech = _get_speech(response)
        original_text = speech if reply.path is not ReplyPath.LLM else None

        try:
            decision = await self._async_decide(user_input, reply, speech)
        except Exception as err:  # noqa: BLE001
            # Casita must never break Assist: answer like the agent did
            LOGGER.warning(
                "Could not attach an emotion to the reply, returning it unchanged: %r",
                err,
                exc_info=LOGGER.isEnabledFor(logging.DEBUG),
            )
            decision = _Decision(
                speech, Emotion.NORMAL, EmotionSource.FALLBACK, EmotionOrigin.RULES
            )

        details = ReplyDetails(
            path=reply.path,
            restyle=decision.restyle,
            original_text=original_text,
            local=reply.local,
            local_ms=reply.local_ms,
            llm_ms=reply.llm_ms,
            ai_task_ms=decision.ai_task_ms,
            total_ms=_elapsed_ms(start),
        )
        self._async_set_speech(response, decision, details)

        if reply.add_to_chat_log or (
            reply.path is ReplyPath.LLM
            and chat_log.content[-1].role == "user"
            and decision.text
        ):
            # Agents that do not write to the chat log only answer in their result
            chat_log.async_add_assistant_content_without_tools(
                conversation.AssistantContent(
                    agent_id=user_input.agent_id, content=decision.text
                )
            )

        LOGGER.debug(
            "Reply %r: path %s, local %s, restyle %s, emotion %s%s, timings %s ms",
            decision.text,
            details.path,
            details.local.result if details.local else None,
            details.restyle,
            decision.emotion,
            " (AI Task pending)" if decision.emotion_pending else "",
            details.timings_ms,
        )
        if decision.emotion_pending:
            self._entry.async_create_task(
                self.hass,
                self._async_publish_ai_task_emotion(
                    user_input, reply.result, decision, details
                ),
                "casita_emotion_fallback",
            )
        else:
            self._async_publish(user_input, reply.result, decision, details)
        return reply.result

    @staticmethod
    def _async_set_speech(
        response: intent.IntentResponse, decision: _Decision, details: ReplyDetails
    ) -> None:
        """Set the speech, with how it was made in its extra data.

        The extra data shows in the raw data of the Assist debug view, the
        frontend does not read it.
        """
        plain = response.speech.get("plain", {})
        extra_data = plain.get("extra_data")
        casita = {
            "path": details.path.value,
            "restyle": details.restyle.value,
            "local_result": details.local.result.value if details.local else None,
            "emotion": None if decision.emotion_pending else decision.emotion.value,
            "timings_ms": details.timings_ms,
        }
        if extra_data is None:
            extra_data = {DOMAIN: casita}
        elif isinstance(extra_data, dict):
            extra_data = {**extra_data, DOMAIN: casita}
        response.async_set_speech(decision.text, extra_data=extra_data)

    async def _async_get_reply(
        self,
        user_input: conversation.ConversationInput,
        chat_log: conversation.ChatLog,
    ) -> _Reply:
        """Return the reply of the local agent or of the LLM agent."""
        llm_agent_id: str | None = self._options.get(CONF_LLM_AGENT)
        if llm_agent_id is not None and self._async_get_llm_agent() is None:
            if self._warned_unavailable_agent != llm_agent_id:
                LOGGER.warning(
                    "Conversation agent %s is not available, answering locally",
                    llm_agent_id,
                )
                self._warned_unavailable_agent = llm_agent_id
            llm_agent_id = None
        else:
            self._warned_unavailable_agent = None

        if llm_agent_id is None:
            language = self._local_languages(user_input.language)[0]
            start = time.monotonic()
            result = await self._async_converse(
                replace(user_input, language=language),
                chat_log,
                conversation.HOME_ASSISTANT_AGENT,
            )
            return _Reply(
                result,
                ReplyPath.LOCAL_FALLBACK,
                language,
                local=_local_match_from_response(result.response, language),
                local_ms=_elapsed_ms(start),
            )

        local: LocalMatch | None = None
        local_ms: int | None = None
        if self._options.get(CONF_LOCAL_FIRST, DEFAULT_LOCAL_FIRST):
            start = time.monotonic()
            response, local = await self._async_handle_locally(
                user_input, chat_log, llm_agent_id
            )
            local_ms = _elapsed_ms(start)
            if response is not None:
                return _Reply(
                    conversation.ConversationResult(
                        response=response, conversation_id=chat_log.conversation_id
                    ),
                    ReplyPath.LOCAL,
                    local.language,
                    add_to_chat_log=True,
                    local=local,
                    local_ms=local_ms,
                )
        else:
            LOGGER.debug("Local commands are off, asking %s", llm_agent_id)

        start = time.monotonic()
        result, stripper = await self._async_converse_llm(
            user_input, chat_log, llm_agent_id
        )
        return _Reply(
            result,
            ReplyPath.LLM,
            user_input.language,
            emotion=stripper.emotion,
            has_tag=stripper.has_tag,
            local=local,
            local_ms=local_ms,
            llm_ms=_elapsed_ms(start),
        )

    async def _async_handle_locally(
        self,
        user_input: conversation.ConversationInput,
        chat_log: conversation.ChatLog,
        llm_agent_id: str,
    ) -> tuple[intent.IntentResponse | None, LocalMatch]:
        """Handle the input with local commands, if one matches.

        Same as "Prefer handling commands locally" in a pipeline: only exact
        matches, and no error reply written to the chat log the LLM reads.
        """
        llm_has_control = bool(
            (state := self.hass.states.get(llm_agent_id))
            and state.attributes.get(EntityStateAttribute.SUPPORTED_FEATURES, 0)
            & conversation.ConversationEntityFeature.CONTROL
        )
        local = LocalMatch(result=LocalResult.NO_MATCH)
        for language in self._local_languages(user_input.language):
            start = time.monotonic()
            response, local = await self._async_try_local(
                replace(user_input, language=language), chat_log, llm_has_control
            )
            LOGGER.debug(
                "Local commands for %r in %s (%d ms): %s %s %s %s",
                user_input.text,
                language,
                _elapsed_ms(start),
                local.result,
                local.intent or "",
                local.slots or "",
                local.error_code or "",
            )
            if response is not None or local.result is not LocalResult.NO_MATCH:
                # The language was right, whatever the result
                return response, local
        return None, local

    async def _async_try_local(
        self,
        user_input: conversation.ConversationInput,
        chat_log: conversation.ChatLog,
        llm_has_control: bool,
    ) -> tuple[intent.IntentResponse | None, LocalMatch]:
        """Try local commands in the language of the input."""
        recognized: list[RecognizeResult] = []

        def intent_filter(result: RecognizeResult) -> bool:
            """Leave some intents to an LLM that can control the home."""
            recognized.append(result)
            return llm_has_control and result.intent.name in _LLM_PREFERRED_INTENTS

        response = await conversation.async_handle_intents(
            self.hass, user_input, chat_log, intent_filter=intent_filter
        )
        if response is not None:
            return response, _local_match_from_response(response, user_input.language)
        if not recognized:
            return None, LocalMatch(
                result=LocalResult.NO_MATCH, language=user_input.language
            )
        # The recognition the default agent used, so no need to run it again
        result = recognized[-1]
        filtered = llm_has_control and result.intent.name in _LLM_PREFERRED_INTENTS
        slots = {
            entity.name: _json_value(entity.value) for entity in result.entities_list
        }
        for unmatched in result.unmatched_entities_list:
            slots[unmatched.name] = _json_value(
                getattr(unmatched, "text", None) or getattr(unmatched, "value", None)
            )
        return None, LocalMatch(
            result=LocalResult.FILTERED if filtered else LocalResult.NO_VALID_TARGETS,
            language=user_input.language,
            intent=result.intent.name,
            slots=slots,
            # Recognized intents only fail to match with this code
            error_code=(
                None
                if filtered
                else intent.IntentResponseErrorCode.NO_VALID_TARGETS.value
            ),
        )

    async def _async_converse(
        self,
        user_input: conversation.ConversationInput,
        chat_log: conversation.ChatLog,
        agent_id: str,
        extra_system_prompt: str | None = None,
    ) -> conversation.ConversationResult:
        """Process the input with another agent, in the same chat log."""
        return await conversation.async_converse(
            self.hass,
            user_input.text,
            chat_log.conversation_id,
            user_input.context,
            language=user_input.language,
            agent_id=agent_id,
            device_id=user_input.device_id,
            satellite_id=user_input.satellite_id,
            extra_system_prompt=extra_system_prompt or user_input.extra_system_prompt,
        )

    def _prompt_language(self, language: str | None) -> PromptLanguage:
        return prompt_language(language, self.hass.config.language)

    async def _async_converse_llm(
        self,
        user_input: conversation.ConversationInput,
        chat_log: conversation.ChatLog,
        agent_id: str,
    ) -> tuple[conversation.ConversationResult, _ChatLogTagStripper]:
        """Process the input with the LLM agent, keeping tags out of sight."""
        language = self._prompt_language(user_input.language)
        extra_system_prompt = build_llm_prompt(
            build_casita_prompt(language, self._options.get(CONF_EXTRA_PERSONALITY)),
            self._entry.runtime_data.mood.async_describe(language),
            user_input.extra_system_prompt,
            chat_log.extra_system_prompt,
        )
        LOGGER.debug("Asking %s in %s", agent_id, user_input.language)
        # The pipeline streams the reply to text-to-speech as it comes in
        listener = None
        if (pipeline_listener := chat_log.delta_listener) is not None:
            listener = _TagFilteringDeltaListener(chat_log, pipeline_listener)
            chat_log.delta_listener = listener
        try:
            with _ChatLogTagStripper(chat_log) as stripper:
                result = await self._async_converse(
                    user_input, chat_log, agent_id, extra_system_prompt
                )
        finally:
            if listener is not None:
                chat_log.delta_listener = pipeline_listener
                listener.async_flush()
        return result, stripper

    def _rule_context(self) -> RuleContext:
        """Return what the rules know besides the response."""
        return RuleContext(
            now=dt_util.now(),
            temperature_unit=self.hass.config.units.temperature_unit,
            mood={
                variable.value: value.value
                for variable, value in self._entry.runtime_data.mood.values.items()
            },
            previous=self._previous,
        )

    async def _async_decide(
        self,
        user_input: conversation.ConversationInput,
        reply: _Reply,
        speech: str,
    ) -> _Decision:
        """Return the text and the emotion of the reply."""
        response = reply.result.response
        context = self._rule_context()

        if reply.path is ReplyPath.LLM:
            # Agents that do not use the chat log keep the tag in their result
            tagged = extract_emotion_tag(speech)
            if (emotion := reply.emotion or tagged.emotion) is not None:
                return _Decision(
                    tagged.text, emotion, EmotionSource.LLM, EmotionOrigin.LLM_TAG
                )
            if reply.has_tag or tagged.has_tag:
                LOGGER.debug("Invalid emotion tag in reply: %s", speech)
            if response_has_details(response):
                emotion, origin = pick_emotion(
                    user_input.text, response, context, self.rng
                )
            elif (emotion := emotion_from_user_text(user_input.text)) is not None:
                origin = EmotionOrigin.KEYWORD
            else:
                # A plain answer: only what the user said can move the face
                emotion, origin = Emotion.NORMAL, EmotionOrigin.RULES
            pending = bool(
                tagged.text
                and response.response_type is not intent.IntentResponseType.ERROR
                and self._async_get_ai_task_entity() is not None
                and self._options.get(
                    CONF_EMOTION_FALLBACK_AI_TASK, DEFAULT_EMOTION_FALLBACK_AI_TASK
                )
            )
            return _Decision(
                tagged.text,
                emotion,
                EmotionSource.FALLBACK,
                origin,
                emotion_pending=pending,
            )

        rewrite = await self._async_restyle(
            user_input, response, speech, reply.language
        )
        if rewrite.emotion is not None:
            emotion, origin = rewrite.emotion, EmotionOrigin.AI_TASK
        else:
            # The rules are the fallback when there is no usable rewrite
            emotion, origin = pick_emotion(user_input.text, response, context, self.rng)
        return _Decision(
            rewrite.text or speech,
            emotion,
            EmotionSource.LOCAL,
            origin,
            restyle=rewrite.result,
            ai_task_ms=rewrite.ai_task_ms,
        )

    @callback
    def _async_get_ai_task_entity(self) -> str | None:
        """Return the AI Task entity, if it can be used."""
        entity_id: str | None = self._options.get(CONF_AI_TASK_ENTITY)
        if entity_id is None or ai_task.DOMAIN not in self.hass.config.components:
            return None
        return entity_id

    async def _async_generate(
        self,
        user_input: conversation.ConversationInput,
        task_name: str,
        instructions: str,
        structure: probatio.Schema | None,
        time_limit: float,
    ) -> tuple[Any, RestyleResult | None, int | None]:
        """Run an AI Task, giving up after a time.

        Return the data, the error if it failed, and how long it took.
        """
        if (entity_id := self._async_get_ai_task_entity()) is None:
            return None, RestyleResult.ERROR, None
        start = time.monotonic()
        try:
            async with asyncio.timeout(time_limit):
                result = await ai_task.async_generate_data(
                    self.hass,
                    task_name=task_name,
                    entity_id=entity_id,
                    instructions=instructions,
                    structure=structure,
                    context=user_input.context,
                )
        except TimeoutError:
            elapsed = _elapsed_ms(start)
            LOGGER.debug("AI Task %s took more than %s s", task_name, time_limit)
            return None, RestyleResult.TIMEOUT, elapsed
        except HomeAssistantError as err:
            elapsed = _elapsed_ms(start)
            LOGGER.debug("AI Task %s failed after %d ms: %s", task_name, elapsed, err)
            return None, RestyleResult.ERROR, elapsed
        elapsed = _elapsed_ms(start)
        LOGGER.debug(
            "AI Task %s answered in %d ms: %r", task_name, elapsed, result.data
        )
        return result.data, None, elapsed

    async def _async_restyle(
        self,
        user_input: conversation.ConversationInput,
        response: intent.IntentResponse,
        speech: str,
        language: str | None,
    ) -> _Rewrite:
        """Return the local reply in the voice of Casita, if the rewrite is safe.

        The emotion of an applied rewrite comes with it.
        """
        if not speech or not self._options.get(
            CONF_RESTYLE_LOCAL, DEFAULT_RESTYLE_LOCAL
        ):
            return _Rewrite(RestyleResult.OFF)
        prompt_language = self._prompt_language(language)
        data, error, elapsed = await self._async_generate(
            user_input,
            "Casita restyle",
            build_restyle_prompt(
                prompt_language,
                self._options.get(CONF_EXTRA_PERSONALITY),
                self._entry.runtime_data.mood.async_describe(prompt_language),
                user_input.text,
                _get_area(response),
                speech,
            ),
            _RESTYLE_STRUCTURE,
            self._options.get(CONF_RESTYLE_TIMEOUT, DEFAULT_RESTYLE_TIMEOUT),
        )
        if error is not None:
            return _Rewrite(error, ai_task_ms=elapsed)
        if not isinstance(data, dict) or not isinstance(text := data.get("text"), str):
            LOGGER.debug("Rewrite of %r has no text: %r", speech, data)
            return _Rewrite(RestyleResult.ERROR, ai_task_ms=elapsed)
        text = clean_rewrite(text)
        if (result := check_rewrite(speech, text)) is not RestyleResult.APPLIED:
            LOGGER.debug("Rewrite %r of %r rejected: %s", text, speech, result)
            return _Rewrite(result, ai_task_ms=elapsed)
        if (emotion := parse_emotion(data.get("emotion"))) is None:
            LOGGER.debug("Rewrite of %r has an invalid emotion: %r", speech, data)
        return _Rewrite(result, text, emotion, elapsed)

    async def _async_publish_ai_task_emotion(
        self,
        user_input: conversation.ConversationInput,
        result: conversation.ConversationResult,
        decision: _Decision,
        details: ReplyDetails,
    ) -> None:
        """Let the AI Task pick the emotion of a reply that was returned."""
        data, _error, elapsed = await self._async_generate(
            user_input,
            "Casita emotion",
            build_emotion_prompt(user_input.text, decision.text),
            _EMOTION_STRUCTURE,
            EMOTION_FALLBACK_TIMEOUT,
        )
        if isinstance(data, dict) and (emotion := parse_emotion(data.get("emotion"))):
            decision.emotion = emotion
            decision.origin = EmotionOrigin.AI_TASK
        self._async_publish(
            user_input, result, decision, replace(details, ai_task_ms=elapsed)
        )

    @callback
    def _async_publish(
        self,
        user_input: conversation.ConversationInput,
        result: conversation.ConversationResult,
        decision: _Decision,
        details: ReplyDetails,
    ) -> None:
        """Expose the emotion of the reply and let it move the mood."""
        update = EmotionUpdate(
            emotion=decision.emotion,
            source=decision.source,
            text=decision.text,
            agent_id=self.entity_id,
            conversation_id=result.conversation_id,
            device_id=user_input.device_id,
            updated=dt_util.utcnow(),
            details=details,
            origin=decision.origin,
        )
        response = result.response
        self._previous = PreviousTurn(
            emotion=decision.emotion,
            time=dt_util.now(),
            intent=(
                response.intent.intent_type
                if details.path is not ReplyPath.LLM and response.intent
                else None
            ),
            slots=response_slots(response)
            if details.path is not ReplyPath.LLM
            else None,
        )
        async_publish_emotion(
            self.hass, self._entry.entry_id, update, user_input.context
        )
        self._entry.runtime_data.mood.async_conversation(
            decision.emotion,
            insult=is_insult(user_input.text),
            error=result.response.response_type is intent.IntentResponseType.ERROR,
        )

"""Prompts of Casita, in English and French."""

from typing import Final, Literal

from homeassistant.const import MATCH_ALL
from homeassistant.util import language as language_util

from .const import PERSONA, PERSONA_EXAMPLES
from .emotion import EMOTIONS

type PromptLanguage = Literal["en", "fr"]

_EXAMPLES_TITLE: Final[dict[PromptLanguage, str]] = {
    "en": "Examples:",
    "fr": "Exemples :",
}
_QUOTES: Final[dict[PromptLanguage, tuple[str, str]]] = {
    "en": ('"', '"'),
    "fr": ("« ", " »"),
}

_EMOTION_TAG_PROMPT: Final[dict[PromptLanguage, str]] = {
    "en": (
        "Start every reply with a tag like [emotion:Happy]. It sets your "
        "expression and is never shown or spoken. Use exactly one of these ids: "
        f"{', '.join(EMOTIONS)}. For example Happy when something worked, Sad for "
        "bad news, Pleading when you did not understand, Problem when something "
        "is broken, Grateful when thanked, Sleeping for good night."
    ),
    "fr": (
        "Commence chaque réponse par une balise comme [emotion:Happy]. Elle règle "
        "ton expression et n'est jamais affichée ni prononcée. Utilise exactement "
        f"un de ces identifiants : {', '.join(EMOTIONS)}. Par exemple Happy quand "
        "quelque chose a marché, Sad pour une mauvaise nouvelle, Pleading quand tu "
        "n'as pas compris, Problem quand quelque chose est cassé, Grateful quand "
        "on te remercie, Sleeping pour souhaiter bonne nuit."
    ),
}

_RESTYLE_RULES: Final[dict[PromptLanguage, str]] = {
    "en": (
        "Say the reply below your way, in one short sentence. Keep every number, "
        "state and name. Add nothing and ask nothing. Also pick the expression "
        "you show with it."
    ),
    "fr": (
        "Redis la réponse ci-dessous à ta façon, en une seule phrase courte. Garde "
        "chaque nombre, état et nom. N'ajoute rien et ne pose pas de question. "
        "Choisis aussi l'expression que tu montres avec."
    ),
}
_RESTYLE_LABELS: Final[dict[PromptLanguage, tuple[str, str, str]]] = {
    "en": ("Request:", "Room:", "Reply:"),
    "fr": ("Demande :", "Pièce :", "Réponse :"),
}

EMOTION_FALLBACK_PROMPT: Final = (
    "Casita is a playful, expressive and kind character. Pick the expression "
    "he shows while saying the reply below."
)


def prompt_language(language: str | None, fallback: str) -> PromptLanguage:
    """Return the language of the prompts for a conversation language."""
    if not language or language == MATCH_ALL:
        language = fallback
    if language_util.matches(language, ["fr"]):
        return "fr"
    return "en"


def _quote(language: PromptLanguage, text: str) -> str:
    start, end = _QUOTES[language]
    return f"{start}{text}{end}"


def build_examples(language: PromptLanguage) -> str:
    """Return the examples of the persona, or an empty string."""
    if not (examples := PERSONA_EXAMPLES.get(language)):
        return ""
    lines = [
        f"{_quote(language, request)} → {_quote(language, reply)}"
        for request, reply in examples
    ]
    return "\n".join([_EXAMPLES_TITLE[language], *lines])


def build_persona(language: PromptLanguage, extra_personality: str | None) -> str:
    """Return the persona with the personality added by the user."""
    parts = [PERSONA[language]]
    if extra_personality and (extra := extra_personality.strip()):
        parts.append(extra)
    return "\n".join(parts)


def build_casita_prompt(language: PromptLanguage, extra_personality: str | None) -> str:
    """Return the constant part of the prompt of the LLM agent."""
    parts = [build_persona(language, extra_personality)]
    if examples := build_examples(language):
        parts.append(examples)
    parts.append(_EMOTION_TAG_PROMPT[language])
    return "\n".join(parts)


def build_llm_prompt(
    casita_prompt: str,
    mood: str,
    caller_prompt: str | None,
    previous_prompt: str | None,
) -> str:
    """Return the extra system prompt for the LLM agent.

    The constant part comes first so providers can cache it, then the mood line.
    The prompt of the caller is kept after them. Like the chat log, a prompt
    given in an earlier turn of the conversation is kept until a new one is
    given.
    """
    prompt = f"{casita_prompt}\n{mood}"
    if caller_prompt:
        return f"{prompt}\n\n{caller_prompt}"
    if previous_prompt and previous_prompt.startswith(f"{casita_prompt}\n"):
        # The mood is one line, the prompt of the caller follows a blank line
        _mood, separator, previous_caller = previous_prompt[
            len(casita_prompt) + 1 :
        ].partition("\n\n")
        if separator and previous_caller:
            return f"{prompt}\n\n{previous_caller}"
    return prompt


def build_restyle_prompt(
    language: PromptLanguage,
    extra_personality: str | None,
    mood: str,
    user_text: str,
    area: str | None,
    reply: str,
) -> str:
    """Return the instructions to restyle a local reply.

    The persona, the rules and the examples come first and do not change, so
    providers can cache them. The mood changes rarely, the request every time.
    """
    request_label, area_label, reply_label = _RESTYLE_LABELS[language]
    parts = [build_persona(language, extra_personality), _RESTYLE_RULES[language]]
    if examples := build_examples(language):
        parts.append(examples)
    parts.append(mood)
    parts.append(f"{request_label} {user_text}")
    if area:
        parts.append(f"{area_label} {area}")
    parts.append(f"{reply_label} {reply}")
    return "\n".join(parts)


def build_emotion_prompt(user_text: str, reply: str) -> str:
    """Return the instructions to pick the emotion of a reply."""
    return f"{EMOTION_FALLBACK_PROMPT}\nUser: {user_text}\nCasita: {reply}"

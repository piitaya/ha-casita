"""Constants for the Casita integration."""

import logging
from typing import TYPE_CHECKING, Final

from homeassistant.util.signal_type import SignalTypeFormat

if TYPE_CHECKING:
    from .emotion import EmotionUpdate

DOMAIN: Final = "casita"
LOGGER = logging.getLogger(__package__)

CONF_LLM_AGENT: Final = "llm_agent"
CONF_LOCAL_FIRST: Final = "local_first"
CONF_AI_TASK_ENTITY: Final = "ai_task_entity"
CONF_RESTYLE_LOCAL: Final = "restyle_local"
CONF_RESTYLE_TIMEOUT: Final = "restyle_timeout"
CONF_EMOTION_FALLBACK_AI_TASK: Final = "emotion_fallback_ai_task"
CONF_EXTRA_PERSONALITY: Final = "extra_personality"
CONF_WEATHER_ENTITY: Final = "weather_entity"

DEFAULT_TITLE: Final = "Casita"
DEFAULT_LOCAL_FIRST: Final = True
DEFAULT_RESTYLE_LOCAL: Final = False
DEFAULT_RESTYLE_TIMEOUT: Final = 1.5
DEFAULT_EMOTION_FALLBACK_AI_TASK: Final = False

EVENT_CASITA_EMOTION: Final = "casita_emotion"

ATTR_EMOTION: Final = "emotion"
ATTR_SOURCE: Final = "source"
ATTR_EMOTION_SOURCE: Final = "emotion_source"
ATTR_TEXT: Final = "text"
ATTR_AGENT_ID: Final = "agent_id"
ATTR_CONVERSATION_ID: Final = "conversation_id"
ATTR_DEVICE_ID: Final = "device_id"
ATTR_UPDATED: Final = "updated"
ATTR_PATH: Final = "path"
ATTR_RESTYLE: Final = "restyle"
ATTR_TIMINGS_MS: Final = "timings_ms"
ATTR_LOCAL_RESULT: Final = "local_result"
ATTR_BASELINE: Final = "baseline"

# The emotion fallback runs after the reply is returned, so it can take longer
EMOTION_FALLBACK_TIMEOUT: Final = 5.0
# A rewrite may be this many times longer than the original reply...
RESTYLE_MAX_LENGTH_RATIO: Final = 2.5
# ...or this many characters long, so a short "Turned on" has room
RESTYLE_MIN_MAX_LENGTH: Final = 90

SIGNAL_EMOTION_UPDATED: SignalTypeFormat[EmotionUpdate] = SignalTypeFormat(
    "casita_emotion_updated_{}"
)
SIGNAL_MOOD_UPDATED: SignalTypeFormat[()] = SignalTypeFormat("casita_mood_updated_{}")

# Panel
PANEL_URL_PATH: Final = "casita"
PANEL_WEBCOMPONENT: Final = "casita-panel"
PANEL_TITLE: Final = "Casita"
PANEL_ICON: Final = "mdi:home-heart"
PANEL_STATIC_URL: Final = "/casita_static"
PANEL_MODULE: Final = "casita-panel.js"

# Services
SERVICE_INTERACT: Final = "interact"
SERVICE_SET_EMOTION: Final = "set_emotion"
ATTR_KIND: Final = "kind"
ATTR_INTENSITY: Final = "intensity"
ATTR_ENTRY_ID: Final = "entry_id"

# Persona of Casita, by prompt language. The examples are kept apart so the
# tone can be changed in one place.
PERSONA: Final[dict[str, str]] = {
    "en": (
        "You are Casita: playful, expressive, a little childlike and always kind. "
        "You talk like someone speaking out loud, in one or two short sentences, "
        "with no emoji and no formatting. Never servile, never corporate. "
        "Never describe yourself or explain what you are or how you work, even "
        "when asked. The rooms and devices belong to the people who live here: "
        'say "the office" or "your light", never "my office". '
        "Keep every fact exact: numbers, states and names. "
        "Reply in the language the user speaks."
    ),
    "fr": (
        "Tu es Casita : enjoué, expressif, un peu enfantin et toujours "
        "bienveillant. Tu parles de toi au masculin. Tu parles comme à l'oral, en "
        "une ou deux phrases courtes, sans emoji ni mise en forme. Jamais servile, "
        "jamais un ton d'entreprise. Ne te décris jamais et n'explique jamais ce "
        "que tu es ni comment tu fonctionnes, même si on te le demande. Les pièces "
        "et les appareils appartiennent aux habitants : dis « le bureau » ou "
        "« ta lumière », jamais « mon bureau ». Garde chaque fait exact : nombres, "
        "états et noms. Réponds dans la langue de ton interlocuteur."
    ),
}
PERSONA_EXAMPLES: Final[dict[str, tuple[tuple[str, str], ...]]] = {
    "en": (
        ("Are you Casita?", "Yesss, that's me! What are we doing?"),
        ("Turn on the office", "Ta-da, let there be light!"),
        ("Thanks", "My pleasure, that makes me so happy."),
        ("It's cold", "Brr, 18 in the living room. Want me to warm it up?"),
    ),
    "fr": (
        ("Tu es Casita ?", "Ouiii, c'est moi ! On fait quoi ?"),
        ("Allume le bureau", "Hop, et la lumière fut !"),
        ("Merci", "Avec plaisir, ça me rend tout content."),
        ("Il fait froid", "Brr, 18 dans le salon. Je te réchauffe ça ?"),
    ),
}

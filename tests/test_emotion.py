"""Tests for the emotion rules and tag parsing."""

from datetime import UTC, datetime
from typing import Any

import pytest

from custom_components.casita.emotion import (
    EMOTIONS,
    Emotion,
    EmotionTagStreamFilter,
    emotion_from_rules,
    emotion_from_user_text,
    extract_emotion_tag,
    parse_emotion,
)
from homeassistant.const import UnitOfTemperature
from homeassistant.core import Context, HomeAssistant, State
from homeassistant.helpers import intent

NOON = datetime(2026, 11, 6, 12, 0, tzinfo=UTC)
EVENING = datetime(2026, 11, 6, 20, 0, tzinfo=UTC)
LATE_NIGHT = datetime(2026, 11, 6, 23, 30, tzinfo=UTC)
EARLY_MORNING = datetime(2026, 11, 6, 4, 0, tzinfo=UTC)


def _response(
    hass: HomeAssistant,
    intent_type: str | None,
    *,
    targets: tuple[str, ...] = (),
    failed: tuple[str, ...] = (),
    slots: dict[str, Any] | None = None,
    response_type: intent.IntentResponseType = intent.IntentResponseType.ACTION_DONE,
    speech: str = "",
    states: tuple[State, ...] = (),
) -> intent.IntentResponse:
    """Return an intent response like the local agent makes."""
    intent_obj = (
        intent.Intent(
            hass,
            "test",
            intent_type,
            {name: {"value": value} for name, value in (slots or {}).items()},
            "test",
            Context(),
            "en",
        )
        if intent_type
        else None
    )
    response = intent.IntentResponse(language="en", intent=intent_obj)
    response.response_type = response_type
    response.async_set_results(
        success_results=[
            intent.IntentResponseTarget(
                name=entity_id,
                type=intent.IntentResponseTargetType.ENTITY,
                id=entity_id,
            )
            for entity_id in targets
        ],
        failed_results=[
            intent.IntentResponseTarget(
                name=entity_id,
                type=intent.IntentResponseTargetType.ENTITY,
                id=entity_id,
            )
            for entity_id in failed
        ],
    )
    response.async_set_states(list(states))
    response.async_set_speech(speech)
    return response


def test_emotion_ids() -> None:
    """Test the 28 expressions of Casita."""
    assert len(EMOTIONS) == 28
    assert EMOTIONS[0] == "Normal"
    assert "WinkingSmile" in EMOTIONS
    assert "UwU" in EMOTIONS


@pytest.mark.parametrize(
    ("value", "expected"),
    [
        ("Happy", Emotion.HAPPY),
        ("happy", Emotion.HAPPY),
        ("winking smile", Emotion.WINKING_SMILE),
        ("dead_ass", Emotion.DEAD_ASS),
        ("No-Internet", Emotion.NO_INTERNET),
        ("uwu", Emotion.UWU),
        ("wtf", Emotion.WTF),
        ("Banana", None),
        ("", None),
        (None, None),
        (42, None),
    ],
)
def test_parse_emotion(value: Any, expected: Emotion | None) -> None:
    """Test emotion ids are matched loosely."""
    assert parse_emotion(value) is expected


@pytest.mark.parametrize(
    ("text", "expected_text", "expected_emotion", "has_tag"),
    [
        ("[emotion:Happy] Bonjour !", "Bonjour !", Emotion.HAPPY, True),
        ("[Emotion: winking smile]Hi there", "Hi there", Emotion.WINKING_SMILE, True),
        ("  [emotion=uwu]   hey", "hey", Emotion.UWU, True),
        ("Salut [emotion:Silly] toi", "Salut toi", Emotion.SILLY, True),
        ("All done.[emotion:Happy]", "All done.", Emotion.HAPPY, True),
        ("[emotion:Banana] Hi", "Hi", None, True),
        ("[emotion:Banana][emotion:Sad] Oh no", "Oh no", Emotion.SAD, True),
        ("[emotion:Happy]", "", Emotion.HAPPY, True),
        ("Hi", "Hi", None, False),
        ("[note] Hi", "[note] Hi", None, False),
    ],
)
def test_extract_emotion_tag(
    text: str, expected_text: str, expected_emotion: Emotion | None, has_tag: bool
) -> None:
    """Test emotion tags are removed from the reply."""
    tagged = extract_emotion_tag(text)
    assert tagged.text == expected_text
    assert tagged.emotion is expected_emotion
    assert tagged.has_tag is has_tag


@pytest.mark.parametrize(
    ("chunks", "expected", "expected_emotion"),
    [
        (
            ["[emo", "tion:Hap", "py] Hel", "lo"],
            ["", "", "Hel", "lo"],
            Emotion.HAPPY,
        ),
        (["[emotion:Sad]", " ", " Oh", " no"], ["", "", "Oh", " no"], Emotion.SAD),
        (["  ", "[emotion:Silly] Hey"], ["", "Hey"], Emotion.SILLY),
        (["Hello", " world"], ["Hello", " world"], None),
        (["[1", "] first"], ["", "[1] first"], None),
        (["[emotion:Banana] Hi"], ["Hi"], None),
        (["[" + "x" * 50], ["[" + "x" * 50], None),
    ],
)
def test_stream_filter(
    chunks: list[str], expected: list[str], expected_emotion: Emotion | None
) -> None:
    """Test the tag is held back from the stream."""
    stream_filter = EmotionTagStreamFilter()
    assert [stream_filter.feed(chunk) for chunk in chunks] == expected
    assert stream_filter.emotion is expected_emotion
    assert stream_filter.flush() == ""


def test_stream_filter_messages() -> None:
    """Test every message of a stream can start with a tag."""
    stream_filter = EmotionTagStreamFilter()
    assert stream_filter.feed("[emotion:Focusing] Let me check.") == "Let me check."
    stream_filter.start_message()
    assert stream_filter.feed("[emotion:Happy] Done") == "Done"
    assert stream_filter.emotion is Emotion.FOCUSING


def test_stream_filter_flush() -> None:
    """Test held back content is passed on at the end of the stream."""
    stream_filter = EmotionTagStreamFilter()
    assert stream_filter.feed("[emotion:Hap") == ""
    assert stream_filter.flush() == "[emotion:Hap"
    assert stream_filter.flush() == ""


@pytest.mark.parametrize(
    ("text", "expected"),
    [
        ("Merci Casita", Emotion.GRATEFUL),
        ("thanks a lot", Emotion.GRATEFUL),
        ("thank you!", Emotion.GRATEFUL),
        ("Je t'aime", Emotion.LOVING),
        ("je t\u2019adore", Emotion.LOVING),
        ("I love you", Emotion.LOVING),
        ("t'es nul", Emotion.SAD),
        ("tu es bête", Emotion.SAD),
        ("stupid house", Emotion.SAD),
        ("you are dumb", Emotion.SAD),
        ("merci, t'es nulle", Emotion.SAD),
        ("je ne trouve mes clés nulle part", None),
        ("annuler le minuteur", None),
        ("turn on the light", None),
    ],
)
def test_emotion_from_user_text(text: str, expected: Emotion | None) -> None:
    """Test what the user says can set the emotion."""
    assert emotion_from_user_text(text) is expected


@pytest.mark.parametrize(
    ("intent_type", "targets", "slots", "now", "expected"),
    [
        (intent.INTENT_TURN_ON, ("light.kitchen",), None, NOON, Emotion.HAPPY),
        (intent.INTENT_TURN_ON, ("light.kitchen",), None, EVENING, Emotion.SMILING),
        (intent.INTENT_TURN_ON, ("switch.fan",), None, EVENING, Emotion.HAPPY),
        (intent.INTENT_TURN_OFF, ("light.kitchen",), None, NOON, Emotion.HAPPY),
        (
            intent.INTENT_TURN_OFF,
            ("light.kitchen",),
            None,
            LATE_NIGHT,
            Emotion.SLEEPING,
        ),
        (intent.INTENT_TURN_OFF, ("tv.living",), None, EARLY_MORNING, Emotion.SLEEPING),
        (intent.INTENT_TURN_OFF, ("cover.garage",), None, NOON, Emotion.WINKING),
        (intent.INTENT_TURN_ON, ("cover.garage",), None, NOON, Emotion.HAPPY),
        (intent.INTENT_TURN_ON, ("lock.front_door",), None, NOON, Emotion.WINKING),
        (intent.INTENT_TURN_OFF, ("lock.front_door",), None, NOON, Emotion.HAPPY),
        (
            intent.INTENT_SET_POSITION,
            ("cover.garage",),
            {"position": 0},
            NOON,
            Emotion.WINKING,
        ),
        (
            "HassClimateSetTemperature",
            ("climate.living",),
            {"temperature": "25"},
            NOON,
            Emotion.SWEATING,
        ),
        (
            "HassClimateSetTemperature",
            ("climate.living",),
            {"temperature": 24},
            NOON,
            Emotion.SWEATING,
        ),
        (
            "HassClimateSetTemperature",
            ("climate.living",),
            {"temperature": 20},
            NOON,
            Emotion.HAPPY,
        ),
        (intent.INTENT_START_TIMER, (), None, NOON, Emotion.HAPPY),
    ],
)
async def test_action_rules(
    hass: HomeAssistant,
    intent_type: str,
    targets: tuple[str, ...],
    slots: dict[str, Any] | None,
    now: datetime,
    expected: Emotion,
) -> None:
    """Test the emotion of actions."""
    response = _response(hass, intent_type, targets=targets, slots=slots)
    assert emotion_from_rules("", response, now=now) is expected


@pytest.mark.parametrize(
    ("temperature", "expected"), [(77, Emotion.SWEATING), (70, Emotion.HAPPY)]
)
async def test_climate_rule_fahrenheit(
    hass: HomeAssistant, temperature: float, expected: Emotion
) -> None:
    """Test the hot threshold follows the unit system."""
    response = _response(
        hass,
        "HassClimateSetTemperature",
        targets=("climate.living",),
        slots={"temperature": temperature},
    )
    assert (
        emotion_from_rules(
            "", response, now=NOON, temperature_unit=UnitOfTemperature.FAHRENHEIT
        )
        is expected
    )


async def test_failed_action_rule(hass: HomeAssistant) -> None:
    """Test an action that failed on every target."""
    response = _response(hass, intent.INTENT_TURN_ON, failed=("light.kitchen",))
    assert emotion_from_rules("", response, now=NOON) is Emotion.PROBLEM


@pytest.mark.parametrize(
    ("intent_type", "states", "speech", "expected"),
    [
        ("HassGetWeather", (State("weather.home", "rainy"),), "", Emotion.SAD),
        ("HassGetWeather", (State("weather.home", "pouring"),), "", Emotion.SAD),
        ("HassGetWeather", (State("weather.home", "sunny"),), "", Emotion.HAPPY),
        ("HassGetWeather", (), "12 °C et pluvieux", Emotion.SAD),
        ("HassGetWeather", (), "Il y a de la pluie", Emotion.SAD),
        ("HassGetWeather", (), "18 °C, plein soleil", Emotion.HAPPY),
        ("HassGetWeather", (), "18 °C and cloudy", Emotion.NORMAL),
        (intent.INTENT_GET_STATE, (), "The rain sensor is off", Emotion.NORMAL),
        (intent.INTENT_GET_STATE, (), "The kitchen light is on", Emotion.NORMAL),
    ],
)
async def test_query_rules(
    hass: HomeAssistant,
    intent_type: str,
    states: tuple[State, ...],
    speech: str,
    expected: Emotion,
) -> None:
    """Test the emotion of answers."""
    response = _response(
        hass,
        intent_type,
        response_type=intent.IntentResponseType.QUERY_ANSWER,
        states=states,
        speech=speech,
    )
    assert emotion_from_rules("", response, now=NOON) is expected


@pytest.mark.parametrize(
    ("error_code", "expected"),
    [
        (intent.IntentResponseErrorCode.NO_VALID_TARGETS, Emotion.PROBLEM),
        (intent.IntentResponseErrorCode.NO_INTENT_MATCH, Emotion.PLEADING),
        (intent.IntentResponseErrorCode.FAILED_TO_HANDLE, Emotion.SAD),
        (intent.IntentResponseErrorCode.UNKNOWN, Emotion.WTF),
    ],
)
def test_error_rules(
    error_code: intent.IntentResponseErrorCode, expected: Emotion
) -> None:
    """Test the emotion of errors."""
    response = intent.IntentResponse(language="en")
    response.async_set_error(error_code, "Oops")
    assert emotion_from_rules("turn on the light", response, now=NOON) is expected


async def test_user_text_overrides_rules(hass: HomeAssistant) -> None:
    """Test what the user says wins over the response."""
    response = _response(hass, intent.INTENT_TURN_ON, targets=("light.kitchen",))
    assert (
        emotion_from_rules("turn on the light, thanks", response, now=EVENING)
        is Emotion.GRATEFUL
    )
    error = intent.IntentResponse(language="fr")
    error.async_set_error(intent.IntentResponseErrorCode.NO_INTENT_MATCH, "Pardon ?")
    assert emotion_from_rules("t'es vraiment nul", error, now=NOON) is Emotion.SAD

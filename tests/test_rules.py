"""Tests for the mood weighted rules picking the emotion of local replies."""

from collections.abc import Sequence
from datetime import UTC, datetime, timedelta
import random
from typing import Any

import pytest

from custom_components.casita.emotion import (
    RULES,
    Emotion,
    EmotionOrigin,
    Outcome,
    PreviousTurn,
    RuleContext,
    draw,
    pick_emotion,
)
from homeassistant.core import Context, HomeAssistant
from homeassistant.helpers import intent

NOON = datetime(2026, 11, 6, 12, 0, tzinfo=UTC)
CALM = {
    "joy": 0.28,
    "excitement": 0.35,
    "energy": 0.7,
    "affection": 0.3,
    "irritation": 0.0,
    "curiosity": 0.3,
}


class RecordingRandom(random.Random):
    """Random generator recording the weights it is given."""

    def __init__(self, pick: int = 0) -> None:
        """Initialize the generator, always picking the same index."""
        super().__init__(0)
        self.pick = pick
        self.calls: list[tuple[list[Any], list[float]]] = []

    def choices(  # type: ignore[override]
        self,
        population: Sequence[Any],
        weights: Sequence[float] | None = None,
        **kwargs: Any,
    ) -> list[Any]:
        """Return the picked item and record the draw."""
        self.calls.append((list(population), list(weights or [])))
        return [population[self.pick]]


def _turn_on(
    hass: HomeAssistant,
    *,
    success: tuple[str, ...] = ("light.kitchen",),
    failed: tuple[str, ...] = (),
    slots: dict[str, Any] | None = None,
) -> intent.IntentResponse:
    response = intent.IntentResponse(
        language="en",
        intent=intent.Intent(
            hass,
            "test",
            intent.INTENT_TURN_ON,
            {name: {"value": value} for name, value in (slots or {}).items()},
            "test",
            Context(),
            "en",
        ),
    )
    response.async_set_results(
        success_results=[
            intent.IntentResponseTarget(
                name=entity_id,
                type=intent.IntentResponseTargetType.ENTITY,
                id=entity_id,
            )
            for entity_id in success
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
    return response


def test_every_outcome_has_emotions() -> None:
    """Test the table covers every outcome, the usual emotion first."""
    assert set(RULES) == set(Outcome)
    assert [candidate.emotion for candidate in RULES[Outcome.SUCCESS]] == [
        Emotion.HAPPY,
        Emotion.SMILING,
        Emotion.GRINNING,
        Emotion.WINKING_SMILE,
    ]
    assert [candidate.emotion for candidate in RULES[Outcome.ANSWER]] == [
        Emotion.NORMAL,
        Emotion.SMILING,
        Emotion.FOCUSING,
    ]
    assert RULES[Outcome.NO_INTENT_MATCH][1].emotion is Emotion.WTF
    assert RULES[Outcome.NO_VALID_TARGETS][1].emotion is Emotion.SWEATING


@pytest.mark.parametrize(
    ("mood", "favorite"),
    [
        ({**CALM, "energy": 0.1}, Emotion.SMILING),
        ({**CALM, "excitement": 0.95}, Emotion.GRINNING),
        ({**CALM, "affection": 1.0}, Emotion.WINKING_SMILE),
        (CALM, Emotion.HAPPY),
    ],
)
def test_mood_weights(mood: dict[str, float], favorite: Emotion) -> None:
    """Test the mood makes some expressions of a success more likely."""
    rng = RecordingRandom()
    draw(RULES[Outcome.SUCCESS], mood, None, rng)
    [(population, weights)] = rng.calls
    assert population[weights.index(max(weights))] is favorite


def test_draw_is_random_and_varied() -> None:
    """Test a seeded generator draws several expressions of a success."""
    rng = random.Random(42)
    drawn = {draw(RULES[Outcome.SUCCESS], CALM, None, rng) for _ in range(200)}
    assert drawn == {
        Emotion.HAPPY,
        Emotion.SMILING,
        Emotion.GRINNING,
        Emotion.WINKING_SMILE,
    }


def test_no_repeat() -> None:
    """Test the previous expression is not shown again when there is another."""
    assert draw(RULES[Outcome.SUCCESS], CALM, Emotion.HAPPY, None) is Emotion.SMILING
    rng = RecordingRandom()
    draw(RULES[Outcome.SUCCESS], CALM, Emotion.HAPPY, rng)
    assert Emotion.HAPPY not in rng.calls[0][0]
    # A single expression is shown again
    assert draw(RULES[Outcome.CLOSED], CALM, Emotion.WINKING, None) is Emotion.WINKING


async def test_partial_failure(hass: HomeAssistant) -> None:
    """Test a command that failed on some targets."""
    response = _turn_on(hass, success=("light.a",), failed=("light.b",))
    assert pick_emotion("turn on the lights", response, RuleContext(now=NOON)) == (
        Emotion.SWEATING,
        EmotionOrigin.RULES,
    )


async def test_repeated_command(hass: HomeAssistant) -> None:
    """Test the same command again within 30 seconds makes Casita cheeky."""
    slots = {"name": "kitchen light"}
    previous = PreviousTurn(
        emotion=Emotion.HAPPY, time=NOON, intent=intent.INTENT_TURN_ON, slots=slots
    )
    response = _turn_on(hass, slots=slots)

    soon = RuleContext(now=NOON + timedelta(seconds=20), previous=previous)
    assert pick_emotion("", response, soon)[0] is Emotion.CHEEKY

    later = RuleContext(now=NOON + timedelta(seconds=31), previous=previous)
    assert pick_emotion("", response, later)[0] is Emotion.SMILING

    other = _turn_on(hass, slots={"name": "desk lamp"})
    assert pick_emotion("", other, soon)[0] is Emotion.SMILING


async def test_annoyed(hass: HomeAssistant) -> None:
    """Test an annoyed Casita does a plain success with a deadpan face."""
    response = _turn_on(hass)
    annoyed = RuleContext(now=NOON, mood={**CALM, "irritation": 0.6})
    assert pick_emotion("", response, annoyed)[0] is Emotion.DEAD_ASS
    calm = RuleContext(now=NOON, mood={**CALM, "irritation": 0.59})
    assert pick_emotion("", response, calm)[0] is Emotion.HAPPY


async def test_specific_cases_win(hass: HomeAssistant) -> None:
    """Test the specific cases win over repeats and annoyance."""
    response = intent.IntentResponse(
        language="en",
        intent=intent.Intent(
            hass,
            "test",
            intent.INTENT_TURN_OFF,
            {},
            "test",
            Context(),
            "en",
        ),
    )
    response.async_set_results(
        success_results=[
            intent.IntentResponseTarget(
                name="Garage",
                type=intent.IntentResponseTargetType.ENTITY,
                id="cover.garage",
            )
        ]
    )
    previous = PreviousTurn(
        emotion=Emotion.WINKING, time=NOON, intent=intent.INTENT_TURN_OFF, slots={}
    )
    context = RuleContext(now=NOON, mood={**CALM, "irritation": 0.9}, previous=previous)
    assert pick_emotion("", response, context)[0] is Emotion.WINKING


async def test_keywords_win(hass: HomeAssistant) -> None:
    """Test what the user says wins over everything."""
    response = _turn_on(hass, success=("light.a",), failed=("light.b",))
    context = RuleContext(now=NOON, mood={**CALM, "irritation": 0.9})
    assert pick_emotion("thanks", response, context) == (
        Emotion.GRATEFUL,
        EmotionOrigin.KEYWORD,
    )
    assert pick_emotion("merci, t'es nul", response, context) == (
        Emotion.SAD,
        EmotionOrigin.KEYWORD,
    )


@pytest.mark.parametrize(
    ("error_code", "emotions"),
    [
        (
            intent.IntentResponseErrorCode.NO_INTENT_MATCH,
            {Emotion.PLEADING, Emotion.WTF},
        ),
        (
            intent.IntentResponseErrorCode.NO_VALID_TARGETS,
            {Emotion.PROBLEM, Emotion.SWEATING},
        ),
        (intent.IntentResponseErrorCode.FAILED_TO_HANDLE, {Emotion.SAD, Emotion.HURT}),
        (intent.IntentResponseErrorCode.UNKNOWN, {Emotion.WTF, Emotion.PROBLEM}),
    ],
)
def test_error_alternatives(
    error_code: intent.IntentResponseErrorCode, emotions: set[Emotion]
) -> None:
    """Test each error has its usual emotion and an alternative."""
    response = intent.IntentResponse(language="en")
    response.async_set_error(error_code, "Oops")
    rng = random.Random(1)
    drawn = {
        pick_emotion("blah", response, RuleContext(now=NOON, mood=CALM), rng)[0]
        for _ in range(100)
    }
    assert drawn == emotions

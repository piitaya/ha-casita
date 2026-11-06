"""Tests for the prompts of Casita."""

import re

import pytest

from custom_components.casita.const import PERSONA, PERSONA_EXAMPLES
from custom_components.casita.prompts import (
    build_casita_prompt,
    build_llm_prompt,
    build_restyle_prompt,
    prompt_language,
)

MOOD = "Your mood right now: calm and content. Let it show without talking about it."


@pytest.mark.parametrize(
    ("language", "expected"),
    [
        ("fr", "fr"),
        ("fr-FR", "fr"),
        ("fr_CA", "fr"),
        ("en", "en"),
        ("de", "en"),
        ("*", "fr"),
        (None, "fr"),
    ],
)
def test_prompt_language(language: str | None, expected: str) -> None:
    """Test French conversations get French prompts, the rest English ones."""
    assert prompt_language(language, "fr") == expected


@pytest.mark.parametrize("language", ["en", "fr"])
def test_persona_shows_instead_of_telling(language: str) -> None:
    """Test the persona does not make Casita describe what he is."""
    prompt = build_casita_prompt(language, None)  # type: ignore[arg-type]
    for pattern in (
        r"visage",
        r"\bface\b",
        r"\bvoix\b",
        r"\bvoice\b",
        r"\bIA\b",
        r"\bAI\b",
        r"modèle",
        r"\bmodel\b",
        r"\bprompt\b",
        r"\bassistant",
        r"smart home itself",
    ):
        assert not re.search(pattern, prompt, re.IGNORECASE), pattern
    # Rooms belong to the people living there
    assert re.search(r"(mon bureau|my office)", PERSONA[language], re.IGNORECASE)
    for request, reply in PERSONA_EXAMPLES[language]:
        assert request in prompt
        assert reply in prompt
        assert "mon bureau" not in reply.lower()
        assert "my office" not in reply.lower()


def test_persona_examples() -> None:
    """Test the examples are the ones chosen for the tone."""
    assert PERSONA_EXAMPLES["fr"][0] == (
        "Tu es Casita ?",
        "Ouiii, c'est moi ! On fait quoi ?",
    )
    assert "« Allume le bureau » → « Hop, et la lumière fut ! »" in (
        build_casita_prompt("fr", None)
    )
    assert '"Turn on the office" → "Ta-da, let there be light!"' in (
        build_casita_prompt("en", None)
    )


def test_extra_personality() -> None:
    """Test the personality of the user follows the persona."""
    prompt = build_casita_prompt("en", "  You call the user captain. ")
    assert prompt.startswith(f"{PERSONA['en']}\nYou call the user captain.\nExamples:")


def test_llm_prompt_keeps_caller_prompt_across_moods() -> None:
    """Test the prompt of the caller survives a change of mood."""
    casita = build_casita_prompt("en", None)
    first = build_llm_prompt(casita, MOOD, "The user is cooking.", None)
    assert first == f"{casita}\n{MOOD}\n\nThe user is cooking."

    tired = "Your mood right now: a bit tired. Let it show without talking about it."
    assert build_llm_prompt(casita, tired, None, first) == (
        f"{casita}\n{tired}\n\nThe user is cooking."
    )
    assert build_llm_prompt(casita, tired, None, None) == f"{casita}\n{tired}"
    # A prompt of another persona is not kept
    assert build_llm_prompt(casita, tired, None, "Something else") == (
        f"{casita}\n{tired}"
    )


def test_restyle_prompt() -> None:
    """Test the rewrite prompt keeps what changes at the end."""
    prompt = build_restyle_prompt(
        "fr",
        None,
        "Ton humeur du moment : calme et serein.",
        "Allume la lumière du bureau",
        "Bureau",
        "Allumé",
    )
    assert prompt.startswith(PERSONA["fr"])
    assert prompt.endswith(
        "Ton humeur du moment : calme et serein.\n"
        "Demande : Allume la lumière du bureau\n"
        "Pièce : Bureau\n"
        "Réponse : Allumé"
    )
    assert "Exemples :" in prompt

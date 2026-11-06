# Emotions and mood

## Emotions

Casita has 28 expressions: Normal, Alert, Angry, Scared, Cheeky, DeadAss, Dead, Devious, Focusing, Grateful, Grinning, Happy, Hurt, Initializing, Loading, Loving, NoInternet, Pleading, Problem, Sad, Silly, Sleeping, Smiling, Sweating, UwU, WTF, Winking, WinkingSmile.

The LLM picks any of them. A restyled local reply gets the emotion the AI Task picked. Otherwise the rules below pick it.

What the user says wins, in French and English:

| User says | Emotion |
| --- | --- |
| An insult, like "nul", "bête", "stupid" or "dumb" | Sad |
| "je t'aime", "love you" | Loving |
| "merci", "thanks" | Grateful |

Then the first matching case of the reply:

| Reply | Emotions |
| --- | --- |
| Action failed on every target | Problem |
| Action failed on some targets | Sweating |
| Thermostat set to 24 °C (75.2 °F) or more | Sweating |
| Something turned off between 23:00 and 05:00 | Sleeping |
| Covers closed or locks locked | Winking |
| Lights turned on between 18:00 and 23:00 | Smiling |
| Same command as the previous reply, within 30 s | Cheeky |
| Action done while irritation is 0.6 or more | DeadAss |
| Action done | Happy, Smiling, Grinning, WinkingSmile |
| Weather with rain | Sad |
| Weather with sun | Happy |
| Answer to a question | Normal, Smiling, Focusing |
| Sentence not understood | Pleading, WTF |
| No matching device or area | Problem, Sweating |
| Action failed | Sad, Hurt |
| Other error | WTF, Problem |

When a case has several emotions, Casita draws one, weighted by its mood. The first one is the usual one. Low energy favors Smiling, high excitement Grinning, high affection WinkingSmile, high joy Smiling and high curiosity Focusing in answers, high irritation WTF and Hurt in errors. The same emotion is not drawn twice in a row.

## Mood

Each Casita entry has six mood sensors. They drift back to their baseline over time.

| Sensor | Range | Baseline | Half-life |
| --- | --- | --- | --- |
| Joy | -1 to 1 | 0.25 + 0.1 × affection, 0.1 lower while it rains | 28 s |
| Excitement | 0 to 1 | 0.35 | 8 s |
| Energy | 0 to 1 | 0.8 from 07:00, 0.7 from 10:00, 0.5 from 19:00, 0.25 from 22:00 | 83 s |
| Affection | 0 to 1 | 0.3 | moves 0.01 a day |
| Irritation | 0 to 1 | 0 | 6 s |
| Curiosity | 0 to 1 | 0.3 | 10 s |

Late at night (22:00 to 07:00) with the sun below the horizon, energy drops twice as fast.

What moves the mood:

| Input | Change |
| --- | --- |
| Any reply | Joy, excitement, affection and curiosity up a bit |
| Reply with Loving or Grateful | Joy and affection up, irritation down |
| Insult, or reply with Angry or Hurt | Joy down, irritation up |
| Reply with an error | Joy down a bit, irritation up |
| A `person` arrives home | Joy and excitement up |
| The `casita.interact` action | Depends on the kind, see below |

The sensors are updated at least every 30 seconds and on every input. The mood is saved and survives restarts.

The mood is summarized in one line in the prompt of the LLM, in the language of the conversation, for example "Ton humeur du moment : un peu fatigué et très affectueux." The line only changes when the mood changes a lot, so providers can keep caching the prompt.

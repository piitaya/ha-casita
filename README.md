# Casita

Casita is a conversation agent for Home Assistant. It answers with the local agent first, hands the rest to your LLM conversation agent, and attaches an emotion to every reply. It has a mood that changes with what happens in the house, and a panel where Casita lives.

## How it works

- Commands Home Assistant understands are handled locally, with the same exact matching as "Prefer handling commands locally". The LLM is not called.
- Everything else goes to the LLM conversation agent you picked. Casita adds its personality and its current mood to the prompt, and asks the LLM to start its reply with a tag like `[emotion:Happy]`.
- The tag is never shown or spoken. It is removed from the reply, from the text streamed to text-to-speech, and from the conversation history Assist shows.
- Local replies get their emotion from rules (see below). If the LLM reply has no valid tag, the rules are used too, or an AI Task if you enabled it. The AI Task runs after the reply is returned, so it never slows it down.
- Optionally, an AI Task rewrites local replies in the voice of Casita and picks the emotion with them. The rewrite is dropped if it loses a number, is longer than 90 characters and 2.5 times the original, or takes longer than the time limit (1.5 s by default).
- Without an LLM agent, Casita only uses the local agent, errors included.
- If something fails in Casita itself, the reply of the agent is returned unchanged.

Local replies and LLM replies share the same conversation history, so the LLM knows what was just done locally.

## Install

HACS: add this repository as a custom repository of type Integration, install Casita and restart Home Assistant.

Manual: copy `custom_components/casita` into the `custom_components` folder of your configuration and restart Home Assistant.

Casita needs Home Assistant 2026.10 or newer.

## Setup

Go to Settings > Devices & services > Add integration > Casita.

| Option | Default | |
| --- | --- | --- |
| LLM conversation agent | none | Agent used for what the local agent does not handle. Empty means local only. |
| Try local commands first | on | Off sends every request to the LLM agent. |
| AI Task entity | none | Needed by the two options below. |
| Restyle local replies | off | Rewrites local replies in the voice of Casita. |
| Restyle time limit | 1.5 s | After this time, the local reply is used as is. |
| Pick missing emotions with the AI Task | off | Used when the LLM reply has no valid tag. |
| Extra personality | none | Added to the personality of Casita. |
| Weather entity | none | Rain makes Casita a bit less cheerful. |

Options can be changed later without reloading.

The rewrite runs while you wait for the answer. Use an AI Task entity with a fast model and no extended thinking, for example Claude Haiku. A model that thinks first misses the time limit and the local reply is used.

Then go to Settings > Voice assistants, open your assistant and pick Casita as conversation agent.

## Turn off "Prefer handling commands locally"

In the voice assistant using Casita, turn off "Prefer handling commands locally".

With this setting on, the pipeline runs local commands before calling Casita. Those requests never reach Casita, so they get no emotion and no restyle. Casita already tries local commands first with the same matching, so the setting only hides replies from Casita.

Two more things the pipeline does before calling any agent:

- Sentence triggers of automations are answered by the pipeline. Their replies get no emotion.
- The short confirmation sound for local commands in the room of a satellite is only played when the pipeline handles the command itself. With Casita, local commands get a spoken reply.

## Local commands that go to the LLM

Local commands only match exact sentences, like "Prefer handling commands locally". These go to the LLM agent:

- Text that does not match a sentence exactly, for example typed without accents ("allume la lumiere").
- A command whose target is ambiguous, for example two entities named "Volet" in the office. Home Assistant does not pick one, the LLM gets the turn.
- Questions about the state of the home, when the LLM agent can control the home. The LLM answers them better.

The `sensor.casita_last_local_result` sensor and the debug logs say which case it was.

## Panel

Casita adds a "Casita" panel to the sidebar, for every user. Casita lives in his room there, you can talk to him and play with him. Its only setting is the assistant (the Assist pipeline) you talk to him with, saved for each user. By default it is the preferred assistant if it uses Casita, else the first assistant that does.

- The panel shows the Casita that is the conversation agent of that assistant. With another agent, it shows the first Casita entry and says he will talk without personality or emotions: he listens, thinks and speaks on his resting face. Only a pipeline error (Problem) or a lost connection (NoInternet) changes his face. The same goes for commands handled locally before reaching Casita.
- When no assistant uses Casita, a banner near the chat says so. Administrators get a "Create Casita assistant" button: it copies the preferred assistant (languages, speech-to-text, text-to-speech, wake word) with Casita as the conversation agent and "Prefer handling commands locally" off, then selects it. A link opens Settings > Voice assistants. Other users are asked to see an administrator.
- The weather and the time of day only change the light of the room, discreetly: warm sun, veiled clouds and fog, grey and cold rain, cold and clear snow, a brief flash now and then during a storm, an orange tint at dawn and dusk, and a darker room at night with a small warm glow near Casita. The weather entity is the one of the Casita options. Without one, it uses the only `weather` entity if there is just one.
- He reacts to every reply of his Casita entry, from any device: the panel shows the emotion and the words. Satellites whose assistant uses this Casita are followed by themselves: when one listens, thinks or answers, Casita does too.

With several Casita entries there is one panel.

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

## Actions

### `casita.interact`

Lets an interaction move the mood, like the panel does.

| Field | |
| --- | --- |
| `kind` | `pet`, `poke`, `tickle`, `hug`, `shake`, `throw`, `wake`, `greet` or `ignore` |
| `intensity` | 0 to 1, 0.5 by default. 0.5 is one ordinary interaction, 1 counts double. |
| `entry_id` | Optional. The Casita to act on. |

### `casita.set_emotion`

Shows an emotion like a reply would: it sets `sensor.casita_emotion` with source `manual` and fires `casita_emotion`. It does not move the mood.

| Field | |
| --- | --- |
| `emotion` | One of the 28 ids, with this exact case |
| `entry_id` | Optional. The Casita to act on. |

Both actions also take the Casita device or one of its entities as target. Without `entry_id` or target, they apply to every Casita.

## Sensors and event

Each Casita entry has a device with:

- the conversation agent,
- `sensor.casita_emotion`,
- the six mood sensors,
- diagnostic sensors about the last reply.

Entity ids follow the language of the system, `sensor.casita_joie` in French.

The emotion sensor state is the emotion of the last reply. Its attributes:

| Attribute | |
| --- | --- |
| `source` | `local` (local reply), `llm` (tag of the LLM), `fallback` (missing or invalid tag, or an error in Casita) or `manual` |
| `emotion_source` | What picked the emotion: `rules`, `keyword`, `llm_tag` or `ai_task` |
| `text` | Reply, without the tag |
| `agent_id` | Casita conversation entity |
| `conversation_id` | Conversation of the reply |
| `device_id` | Device that asked, like a satellite |
| `updated` | Time of the reply |
| `path` | `local` (local command), `llm` or `local_fallback` (no LLM agent set or available) |
| `restyle` | `off`, `applied`, `rejected_numbers`, `rejected_length`, `timeout` or `error` |
| `timings_ms` | Time spent on `local`, `llm`, `ai_task` and `total` |
| `local_result` | What local commands made of the request, see below |

`text`, `conversation_id`, `device_id`, `updated` and `timings_ms` are not recorded in history.

Every reply also fires a `casita_emotion` event with the same data and the `emotion`. The sensor is updated before the event is fired. When the AI Task picks a missing emotion, the sensor and the event come once it answered.

The diagnostic sensors show the last reply:

| Sensor | |
| --- | --- |
| Last path | `local`, `llm` or `local_fallback` |
| Last local result | `matched`, `no_match`, `filtered` (left to the LLM), `no_valid_targets` or `other_error`. Attributes: `language`, `intent`, `slots`, `error_code`. |
| Last restyle | Same values as the `restyle` attribute |
| Last reply duration | Total, in ms |
| Last local duration, Last LLM duration, Last AI Task duration | In ms. Unknown when the step did not run. |
| Last original text | Local reply before the rewrite |

The same details are in the extra data of the reply (`speech.plain.extra_data.casita`), visible in the raw data of the Assist debug view.

Example automations:

```yaml
- alias: Casita blushes
  triggers:
    - trigger: state
      entity_id: sensor.casita_emotion
  conditions:
    - condition: template
      value_template: "{{ states('sensor.casita_emotion') in ['Loving', 'UwU'] }}"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.desk
      data:
        color_name: pink

- alias: Casita is tired, dim the living room
  triggers:
    - trigger: state
      entity_id: sensor.casita_energy
  conditions:
    - condition: template
      value_template: "{{ states('sensor.casita_energy') | float(1) < 0.3 }}"
  actions:
    - action: light.turn_on
      target:
        area_id: living_room
      data:
        brightness_pct: 30

- alias: Casita greets whoever opens the front door
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
  actions:
    - action: casita.interact
      data:
        kind: greet
```

The state trigger without `to` also fires when two replies in a row have the same emotion, because `updated` changes.

## Websocket

The panel asks for the entities, since their ids depend on the language:

```json
{"type": "casita/info"}
```

The result has the `version` of Casita and the list of loaded `entries`. Each entry has `entry_id`, `title`, `conversation_entity`, `emotion_entity`, `mood_entities` (by variable), `diagnostic_entities` (by key), and from its options `llm_agent` and `weather_entity` (or `null`). Any authenticated user can call it.

## Debug

Add this to `configuration.yaml` and restart:

```yaml
logger:
  logs:
    custom_components.casita: debug
```

For each request, the logs say the language local commands were tried in, the result with the intent and the slots, the agent asked, how long each step took, the AI Task answers, and the final path, restyle and emotion.

The Assist dialog in the more info of Casita sends "en" as language when an LLM agent is set: Home Assistant cannot match the language of the system with an agent that supports every language. Casita then tries local commands in the language of the system too. The LLM is still told the conversation is in English, so test the persona from a voice assistant instead.

## Brand

Casita ships its icon and logo in `custom_components/casita/brand`. Home Assistant 2026.3 and newer shows them, no pull request to the brands repository is needed. The SVG sources are in `art`.

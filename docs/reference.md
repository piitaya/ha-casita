# Reference

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

## Brand

Casita ships its icon and logo in `custom_components/casita/brand`. Home Assistant 2026.3 and newer shows them, no pull request to the brands repository is needed. The SVG sources are in `art`.

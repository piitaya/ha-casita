# How Casita works

- Commands Home Assistant understands are handled locally, with the same exact matching as "Prefer handling commands locally". The LLM is not called.
- Everything else goes to the LLM conversation agent you picked. Casita adds its personality and its current mood to the prompt, and asks the LLM to start its reply with a tag like `[emotion:Happy]`.
- The tag is never shown or spoken. It is removed from the reply, from the text streamed to text-to-speech, and from the conversation history Assist shows.
- Local replies get their emotion from rules (see [Emotions and mood](emotions-and-mood.md)). If the LLM reply has no valid tag, the rules are used too, or an AI Task if you enabled it. The AI Task runs after the reply is returned, so it never slows it down.
- Optionally, an AI Task rewrites local replies in the voice of Casita and picks the emotion with them. The rewrite is dropped if it loses a number, is longer than 90 characters and 2.5 times the original, or takes longer than the time limit (1.5 s by default).
- Without an LLM agent, Casita only uses the local agent, errors included.
- If something fails in Casita itself, the reply of the agent is returned unchanged.

Local replies and LLM replies share the same conversation history, so the LLM knows what was just done locally.

## Options

Settings > Devices & services > Casita > Configure.

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

## Turn off "Prefer handling commands locally"

In the voice assistant using Casita, turn off "Prefer handling commands locally". The assistant created from the Casita panel already has it off.

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

## Languages

Casita uses the language of the assistant you talk to. Local commands are tried in that language first, then in the language of the system if nothing matched.

The Assist dialog opened from the more info of the Casita entity is the exception. Home Assistant builds its assistant on the fly, and for an agent that supports every language it cannot match the language of the system, so it picks English. Local commands still work thanks to the fallback to the system language, but the LLM is told the conversation is in English, and the speech-to-text and text-to-speech of that dialog are in English. Use the Casita panel or a voice assistant instead.

## Debug

Add this to `configuration.yaml` and restart:

```yaml
logger:
  logs:
    custom_components.casita: debug
```

For each request, the logs say the language local commands were tried in, the result with the intent and the slots, the agent asked, how long each step took, the AI Task answers, and the final path, restyle and emotion.

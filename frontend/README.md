# Casita panel

The sidebar panel of the Casita integration: Casita in his room, alive, talking through Assist. Lit 3 and TypeScript, bundled with esbuild into one ES module with Lit inside.

## Build

```sh
cd frontend
npm install
npm run build      # → ../custom_components/casita/frontend/casita-panel.js (minified)
npm run typecheck
npm run dev        # watch + serve the work dir on :8123, harness at /frontend/dev/
```

The built bundle ships in `custom_components/casita/frontend/`, so installing the integration needs no build.

## Layout

| Path | |
| --- | --- |
| `src/casita-panel.ts` | `<casita-panel>`: `hass`, `narrow`, `route`, `panel`. Toolbar, room, chat pill, wiring to HA. |
| `src/components/casita-face.ts` | `<casita-face>`: the SVG face driven by the engine. Standalone or `controlled`. |
| `src/ambience.ts` | Weather condition + day phase → the light of the room (`data-sky`); the panel draws it with tinted layers. |
| `src/components/casita-mood-hud.ts` | The six mood sensors. A card, or a strip on narrow. |
| `src/components/casita-settings-dialog.ts` | The assistant setting in a native `<dialog>`. |
| `src/engine/engine.js` | The face engine from the demo, unchanged apart from the module export. |
| `src/life/life.ts` | Behaviours ported from the demo: director, reactions, speech and lip-sync, conversation choreography, weather reactions. |
| `src/assist/` | Pipeline runs (text and mic), the recorder (16 kHz PCM worklet), TTS playback with a WebAudio analyser. |
| `src/data/` | `casita/info`, settings (`frontend/set_user_data` key `casita`), minimal HA types. |
| `dev/` | Fake `hass` harness and Playwright checks. |

## How it talks to Home Assistant

- The only setting is the assistant (Assist pipeline), saved per user with `frontend/set_user_data` key `casita`. Keys from older versions are ignored.
- `casita/info` lists the Casita entries. The panel shows the one whose agent runs the pipeline, else the first. A note says so when the assistant does not use Casita. When it uses Casita with "Prefer handling commands locally" on, a banner near the chat and a warning under the setting say simple commands skip him. Admins can fix it: `assist_pipeline/pipeline/update` with `pipeline_id` and every PIPELINE_FIELDS key copied, only `prefer_local_intents` set to false (the update replaces the whole pipeline; `acknowledge_media_id` is not sent, 2026.11 does not store it). The list is read again after.
- Mood comes from the sensors of that entry. A value that changes while the HUD is open glides there and its row lights up for a second. Touches call `casita.interact` with its `entry_id`, at most once per kind every 2 s.
- Text runs `assist_pipeline/run` from `intent` to `tts` (or `intent` without TTS). The mic runs from `stt` and streams 16 kHz mono PCM through the binary handler, like the HA Assist dialog.
- With a Casita agent, the emotion comes from `casita_emotion` (admins) or the emotion sensor (everyone). With another agent, or a command handled locally before Casita, nothing is guessed: he talks on his resting face. Only a pipeline error (Problem) or a lost connection (NoInternet) changes it.
- Default assistant: the saved one, else the preferred one if it uses Casita, else the first one that does, else the preferred one. The list is read again when the settings open and when the panel becomes visible again.
- No assistant uses Casita: a banner above the chat. Admins can create one with `assist_pipeline/pipeline/create` (a copy of the preferred assistant, or HA defaults, with `conversation_engine` = the Casita entity, `conversation_language` `*` when the agent supports every language, `prefer_local_intents` false, named "Casita" or "Casita 2"…). It is then selected and saved. The link opens `/config/voice-assistants/assistants` (`history.pushState` + `location-changed`, as HA's `navigate()`).
- Every reply of that Casita shows with its words, from any device. Satellites whose "Assistant" select points to a pipeline run by that Casita are followed: when one listens, thinks or answers, Casita does too.
- The room light follows the weather entity of the Casita options (else the only `weather` entity) and `sun.sun` (dawn, day, dusk, night): tinted layers behind Casita cross-fade over 6 s (`--ambience-transition`). A storm flashes the whole room every 6 to 15 s, then Casita startles. His weather reactions look up at the top of the scene.

`ha-dialog` and `ha-select` are not used: they are lazy loaded and changed API between releases, so a custom panel can't count on them. The select is drawn like HA's filled select. `ha-menu-button` is used, it is always loaded.

## Dev harness

```sh
python3 -m http.server 8765        # from the work dir
# open http://localhost:8765/frontend/dev/index.html?lang=fr&dark=0
```

Query options: `lang`, `dark=1`, `admin=0`, `pipeline=p-ha|p-atelier` (preferred assistant), `saved=<pipeline id>`, `weather=<condition>`, `entries=1` (one Casita), `dupes=1` (two Casitas with the same title), `single_weather=1`, `olddata=1` (user data of an older panel), `nocasita=1` (no assistant uses Casita), `nopipelines=1`, `createfail=1`, `updatefail=1`, `casitalangs=1` (Casita agents list their languages), `fast=1` (short light transitions). The fake `hass` has two Casita entries. `window.dev` drives it: `dev.weather('rainy')`, `dev.phase('night')`, `dev.strike()`, `dev.mirror()`, `dev.setMood({ joy: 0.8 })`, `dev.fireEmotion({ emotion: 'Loving' })`, `dev.addCasitaPipeline()`, `dev.setPreferLocal(id, on)`, `dev.disconnect()`, `dev.life()`.

```sh
python3 frontend/dev/check.py      # Playwright, screenshots in frontend/dev/shots/
```

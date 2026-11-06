"""Playwright checks of the Casita panel in the dev harness.

    python3 frontend/dev/check.py            (from the work dir; Chromium from Playwright)

Serves the work dir, opens frontend/dev/index.html with a fake hass, runs the scenarios
and saves screenshots to frontend/dev/shots/. Exits non-zero when a check fails.
"""

from __future__ import annotations

import functools
import http.server
import io
import json
import socketserver
import sys
import threading
from pathlib import Path

from PIL import Image
from playwright.sync_api import Page, sync_playwright

ROOT = Path(__file__).resolve().parents[2]
SHOTS = Path(__file__).resolve().parent / "shots"
SHOTS.mkdir(exist_ok=True)

results: list[tuple[str, bool, str]] = []
all_errors: list[str] = []


def check(name: str, ok: bool, detail: object = "") -> None:
    results.append((name, bool(ok), str(detail)[:300]))
    print(("PASS " if ok else "FAIL ") + name + (f"  [{detail}]" if detail != "" else ""), flush=True)


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):  # noqa: D102
        pass


def serve() -> tuple[socketserver.TCPServer, int]:
    handler = functools.partial(Quiet, directory=str(ROOT))
    httpd = socketserver.TCPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, httpd.server_address[1]


def life(pg: Page) -> dict:
    return pg.evaluate("dev.life()")


def wait_for(pg: Page, js: str, timeout: float = 8000) -> bool:
    try:
        pg.wait_for_function(js, timeout=timeout, polling=50)
        return True
    except Exception:  # noqa: BLE001
        return False


def shot(pg: Page, name: str) -> None:
    pg.screenshot(path=str(SHOTS / name))


def patch(img: Image.Image, box: tuple[float, float, float, float]) -> tuple[float, float, float]:
    """Mean colour of a screenshot region."""
    c = img.crop(tuple(round(v) for v in box)).convert("RGB").resize((1, 1), Image.Resampling.BOX)
    return c.getpixel((0, 0))  # type: ignore[return-value]


def lum(c: tuple[float, float, float]) -> float:
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]


def warm(c: tuple[float, float, float]) -> float:
    """Red minus blue: > 0 warm, < 0 cold."""
    return c[0] - c[2]


def chroma(c: tuple[float, float, float]) -> float:
    return max(c) - min(c)


def main() -> int:
    httpd, port = serve()
    base = f"http://127.0.0.1:{port}/frontend/dev/index.html"
    with sync_playwright() as p:
        browser = p.chromium.launch(
            args=["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", "--autoplay-policy=user-gesture-required"]
        )

        def open_page(w=1280, h=800, dark=False, lang="fr", query="", **ctx_opts) -> Page:
            phone = w < 600
            ctx = browser.new_context(
                viewport={"width": w, "height": h},
                device_scale_factor=1,
                has_touch=phone,
                is_mobile=phone,
                color_scheme="dark" if dark else "light",
                **ctx_opts,
            )
            ctx.grant_permissions(["microphone"], origin=f"http://127.0.0.1:{port}")
            pg = ctx.new_page()
            errs: list[str] = []
            pg.on("pageerror", lambda e: errs.append("pageerror: " + str(e)))
            pg.on("console", lambda m: m.type in ("error", "warning") and errs.append(f"{m.type}: {m.text}"))
            pg._errs = errs  # type: ignore[attr-defined]
            url = f"{base}?lang={lang}&dark={'1' if dark else '0'}{query}"
            pg.goto(url)
            pg.wait_for_function("window.dev && dev.panel && dev.panel._life", timeout=8000)
            return pg

        def done(pg: Page, label: str) -> None:
            errs = pg._errs  # type: ignore[attr-defined]
            check(f"{label}: no console errors", not errs, errs)
            all_errors.extend(errs)
            pg.context.close()

        panel_js = "document.querySelector('casita-panel')"
        sr = f"{panel_js}.shadowRoot"

        # ------------------------------------------------------------------ A. renders
        for w, h, dark, lang in [(1280, 800, False, "fr"), (1280, 800, True, "en"), (390, 844, False, "en"), (390, 844, True, "fr")]:
            pg = open_page(w, h, dark, lang)
            pg.wait_for_timeout(4200)
            tag = f"{w}x{h}-{'dark' if dark else 'light'}-{lang}"
            shot(pg, f"render-{tag}.png")
            geo = pg.evaluate(
                f"""(() => {{
                const r = {sr}.querySelector('.room').getBoundingClientRect();
                const f = {sr}.querySelector('casita-face').shadowRoot.querySelector('.casita-body').getBoundingClientRect();
                const bar = {sr}.querySelector('.chat').getBoundingClientRect();
                const menu = {sr}.querySelector('ha-menu-button');
                return {{ hscroll: document.documentElement.scrollWidth > innerWidth, inRoom: f.left >= r.left && f.right <= r.right && f.top >= r.top && f.bottom <= r.bottom,
                  houseW: f.width, chatInside: bar.left >= 0 && bar.right <= innerWidth, menu: menu && getComputedStyle(menu).display !== 'none',
                  title: {sr}.querySelector('.main-title').textContent, placeholder: {sr}.querySelector('#chat-input').placeholder,
                  dark: {panel_js}.hasAttribute('dark') }};
            }})()"""
            )
            check(f"render {tag}: no horizontal scroll", not geo["hscroll"], geo)
            check(f"render {tag}: Casita inside the room and large", geo["inRoom"] and geo["houseW"] > (150 if w < 600 else 280), geo["houseW"])
            check(f"render {tag}: chat pill fits", geo["chatInside"])
            check(f"render {tag}: menu button only when narrow", geo["menu"] == (w < 870), geo["menu"])
            check(f"render {tag}: language", ("Parle" in geo["placeholder"]) == (lang == "fr"), geo["placeholder"])
            check(f"render {tag}: dark from hass.themes", geo["dark"] == dark)
            done(pg, f"render {tag}")

        # ------------------------------------------------------------------ B. text conversation (Casita pipeline, streamed LLM reply + TTS)
        pg = open_page(1280, 800, False, "fr")
        pg.wait_for_timeout(4000)
        inp = pg.locator("casita-panel").locator("#chat-input")
        inp.click()
        inp.press_sequentially("Coucou Casita, merci", delay=45)
        pg.wait_for_timeout(250)
        d = life(pg)
        check("typing: reads along (keyword reaction or focusing)", d["source"] == "typing" and d["expression"] in ("Happy", "Grateful", "Focusing"), d["expression"])
        shot(pg, "conv-0-typing.png")
        inp.press("Enter")
        pg.wait_for_timeout(1200)
        d = life(pg)
        check("conversation: thinking after send", d["phase"] == "wait" and d["expression"] in ("Loading", "Focusing"), (d["phase"], d["expression"]))
        shot(pg, "conv-1-thinking.png")
        run0 = pg.evaluate("__runs[0].msg")
        check(
            "conversation: assist_pipeline/run intent→tts on the preferred pipeline",
            run0["start_stage"] == "intent" and run0["end_stage"] == "tts" and run0["pipeline"] == "p-casita" and run0["input"]["text"].startswith("Coucou"),
            run0,
        )
        ok = wait_for(pg, "(() => { const d = dev.life(); return d.talk && d.talk.kind === 'stream' && d.talk.rev > 8; })()", 6000)
        bubble = pg.evaluate(f"{sr}.querySelector('.bubble-text').textContent")
        check("conversation: reply streams into the bubble", ok and len(bubble) > 5, bubble)
        check("conversation: emotion tag stripped from the stream", "[" not in bubble and "emotion" not in bubble, bubble)
        shot(pg, "conv-2-streaming.png")
        ok = wait_for(pg, "(() => { const d = dev.life(); return d.talk && d.talk.mode === 'audio'; })()", 8000)
        d = life(pg)
        check("conversation: TTS plays and drives the mouth (audio mode)", ok, d.get("talk"))
        check("conversation: emotion from casita_emotion (Grateful)", d["expression"] == "Grateful", d["expression"])
        mouth = []
        for _ in range(12):
            mouth.append(pg.evaluate(f"{sr}.querySelector('casita-face').face.get('mouth.bH')"))
            pg.wait_for_timeout(60)
        check("conversation: lip-sync from audio amplitude moves the mouth", max(mouth) - min(mouth) > 1.0, [round(m, 2) for m in mouth])
        shot(pg, "conv-3-speaking.png")
        ok = wait_for(pg, "(() => { const d = dev.life(); return !d.talk && d.phase === null && d.source !== 'chat'; })()", 20000)
        d = life(pg)
        check("conversation: back to life after the reply", ok, (d["phase"], d["source"], d["expression"]))
        shot(pg, "conv-4-back.png")
        inp.click()
        inp.fill("allume la lumière du salon")
        inp.press("Enter")
        ok = wait_for(pg, "__runs.length === 2 && __runs[1].events.includes('intent-end')", 6000)
        run1 = pg.evaluate("__runs[1].msg")
        check("conversation: conversation_id kept across turns", run1.get("conversation_id") == "01JCONV1", run1.get("conversation_id"))
        wait_for(pg, "dev.life().expression === 'Happy'", 4000)
        d = life(pg)
        check("conversation: a command → Casita's own emotion (Happy, from casita_emotion)", d["expression"] == "Happy", d["expression"])
        shot(pg, "conv-5-action-done.png")
        pg.wait_for_timeout(6000)
        inp.click()
        inp.fill("erreur")
        inp.press("Enter")
        ok = wait_for(pg, "dev.life().expression === 'Problem'", 6000)
        pg.wait_for_timeout(500)
        shot(pg, "conv-6-error.png")
        check("conversation: pipeline error → Problem + bubble", ok and "Oups" in pg.evaluate(f"{sr}.querySelector('.bubble-text').textContent"))
        pg.wait_for_timeout(3000)
        inp.click()
        inp.fill("hors ligne")
        inp.press("Enter")
        ok = wait_for(pg, "dev.life().expression === 'NoInternet'", 6000)
        shot(pg, "conv-7-offline-error.png")
        check("conversation: connection error → NoInternet", ok)
        done(pg, "conversation (Casita pipeline)")

        # an assistant that does not use Casita: he talks on his resting face, nothing is guessed
        pg = open_page(1280, 800, False, "fr", "&saved=p-ha")
        pg.wait_for_timeout(3500)
        inp = pg.locator("casita-panel").locator("#chat-input")
        inp.click()
        inp.press_sequentially("merci", delay=40)
        pg.wait_for_timeout(250)
        d = life(pg)
        check("other agent: no keyword reaction while typing", d["expression"] not in ("Grateful", "Happy"), (d["source"], d["expression"]))
        inp.fill("blabla")
        inp.press("Enter")
        ok = wait_for(pg, "(() => { const d = dev.life(); return d.talk && d.talk.mode === 'flap' && d.talk.rev > 4; })()", 6000)
        d = life(pg)
        run = pg.evaluate("__runs[0].msg")
        check("other agent: the saved assistant is used, end_stage intent without TTS", run["pipeline"] == "p-ha" and run["end_stage"] == "intent", run)
        check("other agent: no_intent_match → resting face (no Pleading), text lip-sync", ok and d["expression"] == "Normal", (d["expression"], d.get("talk")))
        shot(pg, "conv-8-other-agent-resting.png")
        wait_for(pg, "dev.life().phase === null", 12000)
        pg.wait_for_timeout(1200)
        inp.click()
        inp.fill("allume la lumière")
        inp.press("Enter")
        ok = wait_for(pg, "__runs.length === 2 && __runs[1].events.includes('intent-end')", 6000)
        pg.wait_for_timeout(300)
        d = life(pg)
        check("other agent: action_done → resting face (no Happy)", ok and d["expression"] == "Normal" and d["talk"], (d["expression"], d.get("talk")))
        wait_for(pg, "dev.life().phase === null", 12000)
        pg.wait_for_timeout(1200)
        inp.click()
        inp.fill("Coucou")
        inp.press("Enter")
        ok = wait_for(pg, "(() => { const d = dev.life(); return d.talk && d.talk.rev > 20; })()", 8000)
        d = life(pg)
        bubble = pg.evaluate(f"{sr}.querySelector('.bubble-text').textContent")
        check("other agent: streamed reply, an [emotion:] tag is stripped and ignored", ok and d["expression"] == "Normal" and "[" not in bubble, (d["expression"], bubble))
        wait_for(pg, "dev.life().phase === null", 15000)
        pg.wait_for_timeout(1200)
        inp.click()
        inp.fill("erreur")
        inp.press("Enter")
        ok = wait_for(pg, "dev.life().expression === 'Problem'", 6000)
        check("other agent: a pipeline error still shows Problem", ok, life(pg)["expression"])
        pg.wait_for_timeout(3000)
        inp.click()
        inp.fill("hors ligne")
        inp.press("Enter")
        ok = wait_for(pg, "dev.life().expression === 'NoInternet'", 6000)
        check("other agent: a lost connection still shows NoInternet", ok, life(pg)["expression"])
        done(pg, "conversation (other agent)")

        # non-admin: no event subscription, emotion from sensor.casita_emotion
        pg = open_page(1280, 800, False, "en", "&admin=0")
        pg.wait_for_timeout(3500)
        inp = pg.locator("casita-panel").locator("#chat-input")
        inp.click()
        inp.fill("Hello there")
        inp.press("Enter")
        ok = wait_for(pg, "(() => { const d = dev.life(); return d.talk && d.expression === 'Grateful'; })()", 9000)
        subs = pg.evaluate("__log.filter(l => l.type === 'subscribeEvents').length")
        check("non-admin: emotion from the sensor (no event subscription)", ok and subs == 0, (life(pg)["expression"], subs))
        done(pg, "non-admin")

        # ------------------------------------------------------------------ C. settings: only the assistant
        dlg_js = f"""(() => {{ const d = {sr}.querySelector('casita-settings-dialog').shadowRoot;
            const t = (q) => (d.querySelector(q) || {{}}).textContent || '';
            return {{ open: d.querySelector('dialog').open, focus: d.activeElement && d.activeElement.tagName,
                     selects: d.querySelectorAll('select').length, label: t('.select label'),
                     options: [...d.querySelectorAll('select option')].map(o => o.textContent.trim()), value: (d.querySelector('select') || {{}}).value,
                     help: t('.help'), warning: t('.warning'), note: t('.note'),
                     checkboxes: d.querySelectorAll('input').length }}; }})()"""
        pg = open_page(1280, 800, False, "fr")
        pg.wait_for_timeout(3500)
        pg.locator("casita-panel").get_by_role("button", name="Réglages").click()
        pg.wait_for_timeout(400)
        dlg = pg.evaluate(dlg_js)
        check("settings: dialog opens with focus on the assistant", dlg["open"] and dlg["focus"] == "SELECT", dlg)
        check(
            "settings: a single field, « Assistant »",
            dlg["selects"] == 1 and dlg["checkboxes"] == 0 and dlg["label"] == "Assistant" and dlg["help"] == "L’assistant utilisé quand tu parles à Casita ici.",
            dlg,
        )
        check("settings: pipelines listed, preferred first", dlg["options"] == ["Casita (préféré)", "Casita", "Atelier", "Home Assistant (sans voix)"], dlg["options"])
        check("settings: no warning nor note for a Casita pipeline without local first", not dlg["warning"] and not dlg["note"], dlg)
        shot(pg, "settings-1280-light-fr.png")
        sel = pg.locator("casita-panel").locator("casita-settings-dialog").locator("select")
        sel.select_option("p-atelier")
        pg.wait_for_timeout(300)
        dlg = pg.evaluate(dlg_js)
        saved = pg.evaluate("__userData.casita")
        check("settings: saved per user, only the pipeline", saved == {"pipeline_id": "p-atelier"}, saved)
        check("settings: local-first warning right under the field", "ne passent pas par Casita : il n’y réagit pas." in dlg["warning"] and not dlg["note"], dlg)
        shot(pg, "settings-1280-light-fr-warning.png")
        sel.select_option("p-ha")
        pg.wait_for_timeout(300)
        dlg = pg.evaluate(dlg_js)
        check(
            "settings: note when the assistant does not use Casita",
            dlg["note"] == "Cet assistant n’utilise pas Casita : il parlera sans personnalité ni émotions." and not dlg["warning"],
            dlg,
        )
        shot(pg, "settings-1280-light-fr-not-casita.png")
        sel.select_option("")
        pg.wait_for_timeout(200)
        check("settings: back to the preferred one", pg.evaluate("__userData.casita") == {}, pg.evaluate("__userData.casita"))
        pg.keyboard.press("Escape")
        pg.wait_for_timeout(300)
        check("settings: Esc closes the dialog", not pg.evaluate(f"{sr}.querySelector('casita-settings-dialog').shadowRoot.querySelector('dialog').open"))
        check("life: autonomous life always on", life(pg)["auto"] is True)

        # satellites using this Casita are found by themselves (their "Assistant" select)
        pg.evaluate("() => { dev.mirror(); }")
        pg.wait_for_timeout(700)
        d = life(pg)
        check("satellite: listening → listening pose (no setting)", d["phase"] == "listen" and d["expression"] == "Focusing", (d["phase"], d["expression"]))
        shot(pg, "mirror-1-listening.png")
        pg.wait_for_timeout(1500)
        d = life(pg)
        check("satellite: processing → thinking", d["phase"] in ("wait", "hold"), d["phase"])
        shot(pg, "mirror-2-processing.png")
        ok = wait_for(pg, "(() => { const d = dev.life(); return d.talk && d.talk.rev > 6; })()", 4000)
        d = life(pg)
        bubble = pg.evaluate(f"{sr}.querySelector('.bubble-text').textContent")
        check("satellite: its casita_emotion → emotion + words", ok and d["expression"] == "Smiling" and "21" in d["talk"]["text"], (d["expression"], bubble))
        shot(pg, "mirror-3-responding.png")
        ok = wait_for(pg, "dev.life().phase === null", 12000)
        check("satellite: back to life when it is idle", ok)
        pg.wait_for_timeout(1500)
        pg.evaluate("dev.satellite('listening', 'assist_satellite.vpe_atelier')")
        pg.wait_for_timeout(500)
        check("satellite: one using another Casita is not followed", life(pg)["phase"] is None, life(pg)["phase"])
        pg.evaluate("dev.satellite('idle', 'assist_satellite.vpe_atelier')")
        pg.wait_for_timeout(1500)
        pg.evaluate("dev.fireEmotion({ emotion: 'Loving', text: 'Merci, c’est gentil !', device_id: 'dev-phone' })")
        ok = wait_for(pg, "(() => { const d = dev.life(); return d.expression === 'Loving' && d.talk && d.talk.text.startsWith('Merci'); })()", 3000)
        check("events: any reply of this Casita shows, with its words (other device)", ok, (life(pg)["expression"], (life(pg)["talk"] or {}).get("text")))
        shot(pg, "event-other-device.png")
        done(pg, "settings + satellites")

        # ------------------------------------------------------------------ C2. the pipeline picks the Casita
        pg = open_page(1280, 800, False, "fr", "&pipeline=p-atelier")
        pg.wait_for_timeout(3500)
        pg.locator("casita-panel").locator("#mood-btn").click()
        pg.wait_for_timeout(400)
        hud = pg.evaluate(
            f"""(() => {{ const h = {sr}.querySelector('casita-mood-hud').shadowRoot;
            return {{ heading: (h.querySelector('.heading') || {{}}).textContent, vals: [...h.querySelectorAll('.val')].map(v => v.textContent),
                     titles: [...h.querySelectorAll('.row')].map(r => r.title), warning: !!h.querySelector('.warning') }}; }})()"""
        )
        check("entries: the agent of the pipeline is the Casita shown", hud["heading"] == "Casita Atelier" and hud["vals"][0] == "−0.20" and hud["titles"][0] == "sensor.casita_atelier_joie", hud)
        check("entries: no warning in the HUD (it lives in the settings)", not hud["warning"])
        shot(pg, "hud-entries-1280-fr.png")
        d = life(pg)
        check("entries: Casita's mood comes from that entry", abs(d["mood"]["I"] - 0.35) < 0.06, d["mood"])
        check("weather: no weather in the options and two weather entities → none", d["weather"] is None, d["weather"])
        box = pg.evaluate(f"(() => {{ const b = {sr}.querySelector('casita-face').shadowRoot.querySelector('.casita-house').getBoundingClientRect(); return {{x: b.x, y: b.y, w: b.width, h: b.height}}; }})()")
        pg.mouse.click(box["x"] + box["w"] / 2 + 30, box["y"] + box["h"] * 0.82)
        pg.wait_for_timeout(300)
        c = pg.evaluate("__calls.filter(c => c.service === 'interact').map(c => c.data)")
        check("entries: casita.interact targets that entry", c and all(x.get("entry_id") == "01JATELIER" for x in c), c)
        inp = pg.locator("casita-panel").locator("#chat-input")
        inp.click()
        inp.fill("allume la lumière")
        inp.press("Enter")
        ok = wait_for(pg, "__runs.length && __runs[__runs.length - 1].events.includes('intent-end')", 6000)
        pg.wait_for_timeout(300)
        d = life(pg)
        check("entries: local command bypassing Casita → resting face, nothing guessed", ok and d["expression"] == "Normal", d["expression"])
        pg.locator("casita-panel").get_by_role("button", name="Réglages").click()
        pg.wait_for_timeout(300)
        dlg = pg.evaluate(dlg_js)
        check("entries: the local-first warning stays", "ne passent pas par Casita" in dlg["warning"], dlg["warning"])
        pg.keyboard.press("Escape")
        wait_for(pg, "dev.life().phase === null", 15000)
        pg.wait_for_timeout(1500)
        pg.evaluate("dev.fireEmotion({ emotion: 'Angry', agent_id: 'conversation.casita' })")
        pg.wait_for_timeout(300)
        check("entries: emotions of the other Casita are ignored", life(pg)["expression"] != "Angry", life(pg)["expression"])
        pg.evaluate("dev.fireEmotion({ emotion: 'Loving', agent_id: 'conversation.casita_atelier' })")
        pg.wait_for_timeout(300)
        check("entries: emotions of this Casita show", life(pg)["expression"] == "Loving", life(pg)["expression"])
        done(pg, "pipeline picks the Casita")

        # a pipeline without a Casita agent: first entry
        pg = open_page(1280, 800, False, "en", "&saved=p-ha&single_weather=1")
        pg.wait_for_timeout(3000)
        d = life(pg)
        check("entries: other agent → first entry's mood", abs(d["mood"]["F"] - 0.55) < 0.08, d["mood"])
        pg.locator("casita-panel").get_by_role("button", name="Settings").click()
        pg.wait_for_timeout(300)
        dlg = pg.evaluate(dlg_js)
        check("settings (en): note for another agent", dlg["note"] == "This assistant doesn’t use Casita: he’ll talk without personality or emotions.", dlg["note"])
        pg.keyboard.press("Escape")
        check("weather: Casita without a weather option → the only weather entity", d["weather"] == "sunny", d["weather"])
        done(pg, "other agent, single weather")

        # same titles: the HUD heading tells them apart with the LLM agent
        pg = open_page(1280, 800, False, "en", "&dupes=1&pipeline=p-atelier")
        pg.wait_for_timeout(3000)
        pg.locator("casita-panel").locator("#mood-btn").click()
        pg.wait_for_timeout(300)
        heading = pg.evaluate(f"({sr}.querySelector('casita-mood-hud').shadowRoot.querySelector('.heading') || {{}}).textContent")
        check("entries: same titles told apart (LLM agent)", heading == "Casita (OpenAI)", heading)
        done(pg, "same titles")

        # user data of an older panel: unknown keys ignored, no error
        pg = open_page(1280, 800, False, "fr", "&olddata=1")
        pg.wait_for_timeout(3000)
        pg.locator("casita-panel").get_by_role("button", name="Réglages").click()
        pg.wait_for_timeout(300)
        dlg = pg.evaluate(dlg_js)
        d = life(pg)
        check("migration: old keys ignored, pipeline kept", dlg["value"] == "p-ha" and d["auto"] is True and d["weather"] == "sunny", (dlg["value"], d["auto"], d["weather"]))
        pg.locator("casita-panel").locator("casita-settings-dialog").locator("select").select_option("p-casita")
        pg.wait_for_timeout(200)
        check("migration: the next save drops them", pg.evaluate("__userData.casita") == {"pipeline_id": "p-casita"}, pg.evaluate("__userData.casita"))
        done(pg, "migration")

        # ------------------------------------------------------------------ D. weather and day phases
        pg = open_page(1280, 800, False, "fr")
        pg.wait_for_timeout(4500)
        def colours_during(seconds: float) -> list[str]:
            out = []
            for _ in range(int(seconds / 0.25)):
                out.append(pg.evaluate("dev.life().bodyColor"))
                pg.wait_for_timeout(250)
            return out

        def all_rest(colours: list[str]) -> bool:
            # the resting blue (#18bcf2): no orange, red or grey on the way
            def blue(c: str) -> bool:
                r, g, b = (int(x) for x in c[4:-1].split(","))
                return b > 180 and r < 110 and b - r > 120
            return all(blue(c) for c in colours)

        rest = pg.evaluate("dev.life().bodyColor")
        check("weather: resting colour before", all_rest([rest]), rest)
        check("weather: the entity of the Casita options (not the other one)", life(pg)["weather"] == "sunny", life(pg)["weather"])
        pg.evaluate("dev.weather('rainy')")
        pg.wait_for_timeout(900)
        d = life(pg)
        lids = pg.evaluate(f"{sr}.querySelector('casita-face').face.get('eyeL.top')")
        check("weather: rain → drooping lids", d["weatherFx"] == "rain" and lids > 0.12 and d["weather"] == "rainy", (d["weatherFx"], round(lids, 2), d["expression"]))
        ok = wait_for(pg, "(() => { const g = dev.life().glance; return !!g && g.y - g.top < 0.12 * g.height; })()", 2500)
        check("weather: rain → he slowly looks up at the sky (top of the scene)", ok, life(pg).get("glance"))
        check("room: no window any more", pg.evaluate(f"!{sr}.querySelector('casita-window, .window, .beam, .stars')"))
        shot(pg, "weather-1-rain.png")
        cols = colours_during(2.6)
        check("weather: rain keeps the resting colour", all_rest([d["bodyColor"]] + cols) and d["expression"] not in ("Sad", "Problem"), (d["expression"], sorted(set(cols))))
        pg.wait_for_timeout(1200)
        pg.evaluate("dev.weather('snowy')")
        pg.wait_for_timeout(800)
        d = life(pg)
        shine = pg.evaluate(f"{sr}.querySelector('casita-face').face.get('eyeL.shine')")
        check("weather: snow → shiny eyes and a hop", d["weatherFx"] == "snow" and shine > 0.4, (d["weatherFx"], round(shine, 2)))
        shot(pg, "weather-2-snow.png")
        cols = colours_during(1.5)
        check("weather: snow keeps the resting colour", all_rest([d["bodyColor"]] + cols), sorted(set(cols)))
        pg.wait_for_timeout(1500)
        pg.evaluate(f"(() => {{ window.__flashes = 0; {sr}.querySelector('.flash').addEventListener('animationstart', () => window.__flashes++); }})()")
        pg.evaluate("dev.weather('lightning-rainy')")
        pg.wait_for_timeout(60)
        flashed = pg.evaluate(f"{sr}.querySelector('.flash').classList.contains('on') && window.__flashes === 1")
        check("storm: a brief flash over the whole room as the storm begins", flashed, pg.evaluate("window.__flashes"))
        ok = wait_for(pg, "dev.life().expression === 'Alert'", 1500)
        d = life(pg)
        check("storm: then Casita's startle (Alert, not red)", ok, d["expression"])
        shot(pg, "weather-3-storm.png")
        cols = colours_during(1.2)
        check("weather: lightning keeps the resting colour", all_rest([d["bodyColor"]] + cols), sorted(set(cols)))
        ok = wait_for(pg, "window.__flashes >= 2", 16500)
        check("storm: flashes again from time to time (6–15 s)", ok, pg.evaluate("window.__flashes"))
        pg.wait_for_timeout(1500)
        pg.evaluate("dev.weather('sunny')")
        pg.wait_for_timeout(1100)
        d = life(pg)
        check("weather: sun → soft smile, brighter mood", d["weatherFx"] == "sun" and d["mood"]["V"] > 0.3, (d["weatherFx"], d["mood"]["V"], d["expression"]))
        shot(pg, "weather-4-sun.png")
        cols = colours_during(1.2)
        check("weather: sun keeps the resting colour", all_rest([d["bodyColor"]] + cols), sorted(set(cols)))
        check("storm: no more flashes once it is over", pg.evaluate("dev.panel._stormTimer === undefined"))
        tr = pg.evaluate(f"getComputedStyle({sr}.querySelector('.l-snow')).transitionDuration")
        pg.evaluate("dev.weather('snowy')")
        pg.wait_for_timeout(1500)
        mid = float(pg.evaluate(f"getComputedStyle({sr}.querySelector('.l-snow')).opacity"))
        check("light: changes fade over several seconds", float(tr.rstrip("s")) >= 3 and 0.05 < mid < 0.9, (tr, round(mid, 2)))
        pg.evaluate("dev.weather('sunny')")
        done(pg, "weather")

        # ------------------------------------------------------------------ D2. the light of the room (weather and time of day)
        # Short transitions (?fast=1); mean colours of screenshot patches: a far patch (top left),
        # one at the top right, one right of the room above the floor, one next to Casita.
        states = [
            ("day", "unavailable", "clear"), ("day", "sunny", "sun"), ("day", "cloudy", "cloud"), ("day", "fog", "fog"),
            ("day", "rainy", "rain"), ("day", "snowy", "snow"), ("day", "lightning-rainy", "storm"),
            ("dawn", "unavailable", "dawn"), ("dusk", "unavailable", "dusk"), ("night", "clear-night", "night"), ("night", "rainy", "rain-night"),
        ]
        geo_js = f"""(() => {{ const r = {sr}.querySelector('.room'); const b = r.getBoundingClientRect();
            return {{ x: b.x, y: b.y, w: b.width, h: b.height, hw: parseFloat(getComputedStyle(r).getPropertyValue('--house-w')) }}; }})()"""
        for dark in (False, True):
            theme = "dark" if dark else "light"
            pg = open_page(1280, 800, dark, "fr", "&fast=1")
            pg.wait_for_timeout(3500)
            g = pg.evaluate(geo_js)
            x, y, w, h, hw = g["x"], g["y"], g["w"], g["h"], g["hw"]
            floor, cx = y + h * 0.76, x + w / 2
            boxes = {
                "far": (x + w * 0.03, y + h * 0.22, x + w * 0.03 + 120, y + h * 0.42),
                "topR": (x + w * 0.97 - 120, y + h * 0.04, x + w * 0.97, y + h * 0.22),
                "lowR": (x + w * 0.97 - 120, floor - hw * 0.45, x + w * 0.97, floor - hw * 0.2),
                "near": (cx - hw * 0.9, floor - hw * 0.45, cx - hw * 0.66, floor - hw * 0.2),
            }
            m: dict[str, dict[str, tuple[float, float, float]]] = {}
            for phase, cond, name in states:
                pg.evaluate(f"dev.phase('{phase}'); dev.weather('{cond}')")
                pg.wait_for_timeout(1300 if name == "storm" else 700)  # the storm's first flash is over
                img = Image.open(io.BytesIO(pg.screenshot()))
                m[name] = {k: patch(img, b) for k, b in boxes.items()}
                img.save(SHOTS / f"ambience-1280-{theme}-{name}.png")
            check(f"light {theme}: day phase from sun.sun", life(pg)["dayPhase"] == "night", life(pg)["dayPhase"])
            f = {k: v["far"] for k, v in m.items()}
            summary = {k: (round(lum(c)), round(warm(c), 1)) for k, c in f.items()}
            dt = 1 if dark else 2  # dark rooms move less
            check(f"light {theme}: sun day → warmer", warm(f["sun"]) - warm(f["clear"]) >= 4 * dt, summary)
            check(
                f"light {theme}: sun → a slight gradient (warmer at the top left)",
                warm(m["sun"]["far"]) - warm(m["clear"]["far"]) > warm(m["sun"]["lowR"]) - warm(m["clear"]["lowR"]) + 3,
                (round(warm(m["sun"]["far"]), 1), round(warm(m["sun"]["lowR"]), 1)),
            )
            for c in ("cloud", "fog"):
                check(
                    f"light {theme}: {c} → more neutral, slightly veiled",
                    chroma(f[c]) < chroma(f["clear"]) and warm(f[c]) < warm(f["sun"]) and abs(lum(f[c]) - lum(f["clear"])) >= 3,
                    (round(chroma(f[c]), 1), round(chroma(f["clear"]), 1), round(lum(f[c])), round(lum(f["clear"]))),
                )
            check(
                f"light {theme}: rain → greyer and colder",
                lum(f["rain"]) <= lum(f["clear"]) - 3 * dt and warm(f["rain"]) <= warm(f["clear"]) - 2,
                (summary["rain"], summary["clear"]),
            )
            check(
                f"light {theme}: snow → cold and clear",
                warm(f["snow"]) <= warm(f["clear"]) - 3 and lum(f["snow"]) >= lum(f["rain"]) + 10,
                (summary["snow"], summary["clear"], summary["rain"]),
            )
            check(f"light {theme}: storm → grey like rain", lum(f["storm"]) <= lum(f["clear"]) + 1 and warm(f["storm"]) <= warm(f["clear"]), (summary["storm"], summary["clear"]))
            check(f"light {theme}: dawn → light orange tint", warm(m["dawn"]["topR"]) - warm(m["clear"]["topR"]) >= 3 * dt, (round(warm(m["dawn"]["topR"]), 1), round(warm(m["clear"]["topR"]), 1)))
            check(f"light {theme}: dusk → light orange tint", warm(f["dusk"]) - warm(f["clear"]) >= 3 * dt, (summary["dusk"], summary["clear"]))
            check(f"light {theme}: night → darker room", lum(f["night"]) <= lum(f["clear"]) - 4 * dt, (summary["night"], summary["clear"]))
            glow = (warm(m["night"]["near"]) - warm(m["night"]["far"])) - (warm(m["clear"]["near"]) - warm(m["clear"]["far"]))
            check(f"light {theme}: night → a small warm glow near Casita", glow >= 5, round(glow, 1))
            lums = [lum(c) for c in f.values()]
            check(
                f"light {theme}: discreet, readability kept",
                (min(lums) >= 170 if not dark else max(lums) <= 60) and max(abs(v - lum(f["clear"])) for v in lums) <= 75,
                [round(v) for v in lums],
            )
            done(pg, f"room light {theme}")

        for dark in (False, True):
            theme = "dark" if dark else "light"
            pg = open_page(390, 844, dark, "fr", "&fast=1")
            pg.wait_for_timeout(3500)
            for phase, cond, name in [("day", "sunny", "sun"), ("day", "snowy", "snow"), ("dusk", "unavailable", "dusk"), ("night", "rainy", "rain-night")]:
                pg.evaluate(f"dev.phase('{phase}'); dev.weather('{cond}')")
                pg.wait_for_timeout(700)
                shot(pg, f"ambience-390-{theme}-{name}.png")
            done(pg, f"room light 390 {theme}")

        # ------------------------------------------------------------------ E. mood HUD + floating indicators
        pg = open_page(1280, 800, False, "fr")
        pg.wait_for_timeout(3500)
        btn = pg.locator("casita-panel").locator("#mood-btn")
        check("hud: hidden by default", pg.evaluate(f"!{sr}.querySelector('casita-mood-hud')"))
        btn.click()
        pg.wait_for_timeout(300)
        hud = pg.evaluate(
            f"""(() => {{ const h = {sr}.querySelector('casita-mood-hud'); if (!h) return null;
            return {{ rows: [...h.shadowRoot.querySelectorAll('.row')].map(r => r.querySelector('.name').textContent + '=' + r.querySelector('.val').textContent),
                     expanded: {sr}.querySelector('#mood-btn').getAttribute('aria-expanded') }}; }})()"""
        )
        check("hud: shows the six sensors from casita/info", hud and len(hud["rows"]) == 6 and hud["rows"][0].startswith("Joie="), hud)
        lit_js = f"[...{sr}.querySelector('casita-mood-hud').shadowRoot.querySelectorAll('.row.lit')].map(r => r.querySelector('.name').textContent)"
        check("hud: nothing lit when it opens", pg.evaluate(lit_js) == [], pg.evaluate(lit_js))
        width0 = pg.evaluate(f"{sr}.querySelector('casita-mood-hud').shadowRoot.querySelector('.m-affection .bar i').getBoundingClientRect().width")
        pg.evaluate("dev.setMood({ affection: 0.8 })")
        pg.wait_for_timeout(250)
        width1 = pg.evaluate(f"{sr}.querySelector('casita-mood-hud').shadowRoot.querySelector('.m-affection .bar i').getBoundingClientRect().width")
        lit = pg.evaluate(lit_js)
        check("hud: the changed row lights up", lit == ["Affection"], lit)
        shot(pg, "hud-1280-light-fr.png")
        pg.wait_for_timeout(900)
        width2 = pg.evaluate(f"{sr}.querySelector('casita-mood-hud').shadowRoot.querySelector('.m-affection .bar i').getBoundingClientRect().width")
        check("hud: the bar glides to its new value", width0 < width1 < width2, (round(width0, 1), round(width1, 1), round(width2, 1)))
        pg.wait_for_timeout(300)
        check("hud: the light fades after a second", pg.evaluate(lit_js) == [], pg.evaluate(lit_js))
        hud2 = pg.evaluate(f"[...{sr}.querySelector('casita-mood-hud').shadowRoot.querySelectorAll('.val')].map(v => v.textContent)")
        check("hud: values live from hass.states", hud2[3] == "0.80", hud2)
        pg.keyboard.press("Escape")
        pg.wait_for_timeout(200)
        check("hud: Esc closes it", pg.evaluate(f"!{sr}.querySelector('casita-mood-hud')"))
        pg.evaluate("dev.setMood({ joy: 0.7, curiosity: 0.8 })")
        pg.wait_for_timeout(300)
        check("hud closed: no mood indicator anywhere in the room", pg.evaluate(f"!{sr}.querySelector('.floater, .floaters')"))
        done(pg, "hud desktop")

        pg = open_page(390, 844, False, "en")
        pg.wait_for_timeout(3500)
        pg.locator("casita-panel").locator("#mood-btn").tap()
        pg.evaluate("dev.setMood({ irritation: 0.5, curiosity: 0.7 })")
        pg.wait_for_timeout(350)
        shot(pg, "hud-390-light-en-strip.png")
        cut = pg.evaluate(f"[...{sr}.querySelector('casita-mood-hud').shadowRoot.querySelectorAll('.name')].filter(n => n.scrollWidth > n.clientWidth + 0.5).map(n => n.textContent)")
        check("hud narrow (en): labels not truncated at 390 px", not cut, cut)
        hscroll = pg.evaluate("document.documentElement.scrollWidth > innerWidth")
        check("hud narrow: strip without horizontal scroll", not hscroll)
        pg.locator("casita-panel").get_by_role("button", name="Settings").tap()
        pg.wait_for_timeout(400)
        shot(pg, "settings-390-light-en.png")
        done(pg, "hud narrow")

        pg = open_page(390, 844, True, "fr")
        pg.wait_for_timeout(3500)
        pg.locator("casita-panel").locator("#mood-btn").tap()
        pg.wait_for_timeout(300)
        cut = pg.evaluate(f"[...{sr}.querySelector('casita-mood-hud').shadowRoot.querySelectorAll('.name')].filter(n => n.scrollWidth > n.clientWidth + 0.5).map(n => n.textContent)")
        names = pg.evaluate(f"[...{sr}.querySelector('casita-mood-hud').shadowRoot.querySelectorAll('.name')].map(n => n.textContent)")
        check("hud narrow (fr): labels not truncated at 390 px (Agacement…)", not cut and "Agacement" in names, (cut, names))
        shot(pg, "hud-390-dark-fr-strip.png")
        pg.locator("casita-panel").locator("#mood-btn").tap()
        pg.wait_for_timeout(200)
        pg.locator("casita-panel").get_by_role("button", name="Réglages").tap()
        pg.wait_for_timeout(400)
        shot(pg, "settings-390-dark-fr.png")
        done(pg, "settings narrow dark")

        pg = open_page(1280, 800, True, "en")
        pg.wait_for_timeout(3000)
        pg.locator("casita-panel").get_by_role("button", name="Settings").click()
        pg.wait_for_timeout(400)
        shot(pg, "settings-1280-dark-en.png")
        done(pg, "settings desktop dark")

        # ------------------------------------------------------------------ F. no assistant talks to Casita
        empty_js = f"""(() => {{ const e = {sr}.querySelector('.empty'); if (!e) return null;
            const t = (q) => [...e.querySelectorAll(q)].map(n => n.textContent.trim());
            const r = e.getBoundingClientRect(), c = {sr}.querySelector('.chat').getBoundingClientRect();
            return {{ text: t('.empty-text'), notes: t('.empty-note'), buttons: t('button'), links: t('a'), error: t('.empty-error'),
                     aboveChat: r.bottom <= c.top + 1, inside: r.left >= 0 && r.right <= innerWidth, disabled: !!e.querySelector('button[disabled]') }}; }})()"""
        creates_js = "__log.filter(l => l.type === 'callWS' && l.msg.type === 'assist_pipeline/pipeline/create').map(l => l.msg)"

        # admin, assistants exist but none uses Casita
        pg = open_page(1280, 800, False, "fr", "&nocasita=1")
        pg.wait_for_timeout(3500)
        e = pg.evaluate(empty_js)
        check("empty: a discreet banner near the chat", e and e["aboveChat"] and e["inside"] and e["text"] == ["Pour me parler, crée un assistant qui m’utilise comme agent de conversation."], e)
        check("empty: the « n’utilise pas Casita » note stays visible", e and "Cet assistant n’utilise pas Casita : il parlera sans personnalité ni émotions." in e["notes"], e)
        check("empty (admin): « Créer l’assistant Casita » + « Régler dans les assistants »", e and e["buttons"] == ["Créer l’assistant Casita"] and e["links"] == ["Régler dans les assistants"], e)
        check("empty: Casita stays alive", life(pg)["auto"] is True and life(pg)["phase"] is None)
        shot(pg, "empty-1280-light-fr-admin.png")
        inp = pg.locator("casita-panel").locator("#chat-input")
        inp.click()
        inp.fill("blabla")
        inp.press("Enter")
        ok = wait_for(pg, "(() => { const d = dev.life(); return d.talk && d.talk.rev > 4; })()", 6000)
        run = pg.evaluate("__runs[0].msg")
        check("empty: the chat works with the selected assistant (preferred)", ok and run["pipeline"] == "p-ha" and life(pg)["expression"] == "Normal", (run, life(pg)["expression"]))
        wait_for(pg, "dev.life().phase === null", 12000)
        pg.locator("casita-panel").get_by_role("button", name="Réglages").click()
        pg.wait_for_timeout(300)
        dlg = pg.evaluate(dlg_js)
        check("empty: settings list the assistants with the note", dlg["options"][0] == "Home Assistant (préféré)" and dlg["note"].startswith("Cet assistant n’utilise pas Casita"), dlg)
        pg.keyboard.press("Escape")
        pg.wait_for_timeout(200)
        pg.locator("casita-panel").get_by_role("link", name="Régler dans les assistants").click()
        pg.wait_for_timeout(200)
        nav = pg.evaluate("window.__locationChanged")
        check(
            "empty: the link opens Settings > Voice assistants (pushState + location-changed)",
            pg.evaluate("location.pathname") == "/config/voice-assistants/assistants" and nav and nav[-1]["path"] == "/config/voice-assistants/assistants",
            (pg.evaluate("location.pathname"), nav),
        )
        done(pg, "empty state (admin)")

        # create the Casita assistant from the preferred one
        pg = open_page(1280, 800, False, "fr", "&nocasita=1")
        pg.wait_for_timeout(3500)
        pg.locator("casita-panel").get_by_role("button", name="Créer l’assistant Casita").click()
        ok = wait_for(pg, f"!{sr}.querySelector('.empty')", 4000)
        created = pg.evaluate(creates_js)
        want = {
            "type": "assist_pipeline/pipeline/create", "name": "Casita 2", "language": "fr", "conversation_engine": "conversation.casita",
            "conversation_language": "*", "prefer_local_intents": False, "stt_engine": "stt.faster_whisper", "stt_language": "fr",
            "tts_engine": "tts.piper", "tts_language": "fr", "tts_voice": "fr_FR-siwis-medium", "wake_word_entity": "wake_word.openwakeword", "wake_word_id": "ok_nabu",
        }
        check("create: assist_pipeline/pipeline/create copies the preferred assistant", len(created) == 1 and {k: created[0].get(k) for k in want} == want, created)
        check("create: « Casita » is taken → « Casita 2 », Casita's agent, all languages, not local first", created and created[0]["name"] == "Casita 2", created)
        check("create: selected and saved in user data", pg.evaluate("__userData.casita") == {"pipeline_id": "p-new1"}, pg.evaluate("__userData.casita"))
        check("create: the empty state disappears", ok)
        ok2 = wait_for(pg, "(() => { const d = dev.life(); return d.talk && d.talk.text.startsWith('Merci'); })()", 3000)
        check("create: Casita is glad (« Merci ! On peut parler maintenant. »)", ok2, (life(pg)["expression"], (life(pg)["talk"] or {}).get("text")))
        shot(pg, "empty-2-created.png")
        wait_for(pg, "dev.life().phase === null", 12000)
        pg.wait_for_timeout(800)
        inp = pg.locator("casita-panel").locator("#chat-input")
        inp.click()
        inp.fill("Coucou")
        inp.press("Enter")
        ok = wait_for(pg, "(() => { const d = dev.life(); return d.talk && d.expression === 'Grateful'; })()", 9000)
        run = pg.evaluate("__runs[__runs.length - 1].msg")
        check("create: the next message goes to the new assistant, with Casita's emotions", ok and run["pipeline"] == "p-new1", (run["pipeline"], life(pg)["expression"]))
        done(pg, "create assistant")

        # failure: a clear message, the banner stays
        pg = open_page(1280, 800, False, "fr", "&nocasita=1&createfail=1")
        pg.wait_for_timeout(3500)
        pg.locator("casita-panel").get_by_role("button", name="Créer l’assistant Casita").click()
        wait_for(pg, f"!!{sr}.querySelector('.empty-error')", 3000)
        e = pg.evaluate(empty_js)
        check("create fails: a clear message, the banner stays", e and e["error"] and e["error"][0].startswith("Impossible de créer l’assistant.") and not e["disabled"], e)
        check("create fails: nothing saved", pg.evaluate("__userData.casita") is None, pg.evaluate("__userData.casita"))
        shot(pg, "empty-3-create-failed.png")
        done(pg, "create assistant fails")

        # no assistant at all: HA defaults (system language, no engines)
        pg = open_page(390, 844, False, "en", "&nopipelines=1")
        pg.wait_for_timeout(3500)
        e = pg.evaluate(empty_js)
        check("empty (no assistant at all): banner without the note", e and e["text"] == ["To talk with me, create an assistant that uses me as its conversation agent."] and not e["notes"] and e["inside"], e)
        shot(pg, "empty-390-light-en-none.png")
        pg.locator("casita-panel").get_by_role("button", name="Create Casita assistant").tap()
        wait_for(pg, f"!{sr}.querySelector('.empty')", 4000)
        created = pg.evaluate(creates_js)
        want = {"name": "Casita", "language": "en", "conversation_engine": "conversation.casita", "conversation_language": "*", "prefer_local_intents": False,
                "stt_engine": None, "tts_engine": None, "tts_voice": None, "wake_word_entity": None, "wake_word_id": None}
        check("create without a preferred assistant: HA defaults", created and {k: created[0].get(k) for k in want} == want, created)
        done(pg, "create from defaults")

        # Casita's agent lists its languages: the system language
        pg = open_page(1280, 800, False, "fr", "&nocasita=1&casitalangs=1")
        pg.wait_for_timeout(3000)
        pg.locator("casita-panel").get_by_role("button", name="Créer l’assistant Casita").click()
        wait_for(pg, f"!{sr}.querySelector('.empty')", 4000)
        created = pg.evaluate(creates_js)
        check("create: conversation_language = system language when Casita does not declare « * »", created and created[0]["conversation_language"] == "fr", created)
        done(pg, "create, agent languages")

        # not an admin: ask one
        pg = open_page(1280, 800, True, "fr", "&nocasita=1&admin=0")
        pg.wait_for_timeout(3500)
        e = pg.evaluate(empty_js)
        check("empty (not admin): « Demande à un administrateur… », no button", e and "Demande à un administrateur de créer un assistant Casita." in e["notes"] and not e["buttons"] and not e["links"], e)
        shot(pg, "empty-1280-dark-fr-user.png")
        done(pg, "empty state (user)")

        # a Casita assistant appears: re-read on return to the panel and when settings open
        pg = open_page(1280, 800, False, "fr", "&nocasita=1")
        pg.wait_for_timeout(3000)
        pg.evaluate("dev.addCasitaPipeline('Casita')")
        lists0 = pg.evaluate("__log.filter(l => l.type === 'callWS' && l.msg.type === 'assist_pipeline/pipeline/list').length")
        pg.evaluate("Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange'))")
        pg.wait_for_timeout(200)
        pg.evaluate("Object.defineProperty(document, 'hidden', { configurable: true, get: () => false }); document.dispatchEvent(new Event('visibilitychange'))")
        ok = wait_for(pg, f"!{sr}.querySelector('.empty')", 3000)
        check("appears: back on the panel → the list is read again, the banner goes", ok and pg.evaluate("__log.filter(l => l.type === 'callWS' && l.msg.type === 'assist_pipeline/pipeline/list').length") > lists0)
        pg.locator("casita-panel").get_by_role("button", name="Réglages").click()
        pg.wait_for_timeout(300)
        dlg = pg.evaluate(dlg_js)
        check("appears: selected by default (no saved choice)", dlg["options"][0] == "Casita (par défaut)" and dlg["value"] == "" and not dlg["note"], dlg)
        check("appears: settings re-read the list when they open", pg.evaluate("__log.filter(l => l.type === 'callWS' && l.msg.type === 'assist_pipeline/pipeline/list').length") > lists0 + 1)
        pg.keyboard.press("Escape")
        inp = pg.locator("casita-panel").locator("#chat-input")
        inp.click()
        inp.fill("Coucou")
        inp.press("Enter")
        ok = wait_for(pg, "__runs.length === 1", 3000)
        check("appears: messages go to it", ok and pg.evaluate("__runs[0].msg.pipeline") == "p-new1", pg.evaluate("__runs[0] && __runs[0].msg.pipeline"))
        done(pg, "Casita assistant appears")

        # the preferred assistant is not Casita but another one is: that one by default
        pg = open_page(1280, 800, False, "fr", "&pipeline=p-ha")
        pg.wait_for_timeout(3000)
        check("default: no banner when a Casita assistant exists", not pg.evaluate(f"!!{sr}.querySelector('.empty')"))
        pg.locator("casita-panel").get_by_role("button", name="Réglages").click()
        pg.wait_for_timeout(300)
        dlg = pg.evaluate(dlg_js)
        check("default: the first Casita assistant, not the preferred one", dlg["options"][0] == "Casita (par défaut)" and not dlg["note"], dlg["options"])
        done(pg, "default assistant")

        # ------------------------------------------------------------------ F2. simple commands skip Casita (prefer local on a Casita assistant)
        local_js = f"""(() => {{ const e = {sr}.querySelector('.empty.local'); if (!e) return null;
            const t = (q) => [...e.querySelectorAll(q)].map(n => n.textContent.trim());
            const r = e.getBoundingClientRect(), c = {sr}.querySelector('.chat').getBoundingClientRect();
            return {{ text: t('.empty-text'), notes: t('.empty-note'), buttons: t('button'), error: t('.empty-error'),
                     aboveChat: r.bottom <= c.top + 1, inside: r.left >= 0 && r.right <= innerWidth, disabled: !!e.querySelector('button[disabled]') }}; }})()"""
        dlg_warn_js = f"""(() => {{ const d = {sr}.querySelector('casita-settings-dialog').shadowRoot; const w = d.querySelector('.warning'); if (!w) return null;
            const t = (q) => [...w.querySelectorAll(q)].map(n => n.textContent.trim());
            return {{ text: t('#warning-text'), buttons: t('button'), notes: t('.warning-note'), error: t('.warning-error') }}; }})()"""
        updates_js = "__log.filter(l => l.type === 'callWS' && l.msg.type === 'assist_pipeline/pipeline/update').map(l => l.msg)"
        lists_js = "__log.filter(l => l.type === 'callWS' && l.msg.type === 'assist_pipeline/pipeline/list').length"
        fr_warn = "Avec cet assistant, les commandes simples (« allume la lumière ») ne passent pas par Casita : il n’y réagit pas."

        # admin: fix from the main view
        pg = open_page(1280, 800, False, "fr", "&pipeline=p-atelier")
        pg.wait_for_timeout(3500)
        e = pg.evaluate(local_js)
        check("local: banner near the chat, says what happens", e and e["aboveChat"] and e["inside"] and e["text"] == [fr_warn], e)
        check("local (admin): a « Corriger » button", e and e["buttons"] == ["Corriger"] and not e["notes"], e)
        check("local: same place and style as the no-assistant banner", pg.evaluate(f"getComputedStyle({sr}.querySelector('.empty.local')).borderRadius") == "16px")
        shot(pg, "local-1280-light-fr-admin.png")
        pg.locator("casita-panel").get_by_role("button", name="Réglages").click()
        pg.wait_for_timeout(300)
        w = pg.evaluate(dlg_warn_js)
        check("local: also under the Assistant field in the settings, with « Corriger »", w and w["text"] == [fr_warn] and w["buttons"] == ["Corriger"], w)
        shot(pg, "local-settings-1280-light-fr.png")
        pg.keyboard.press("Escape")
        pg.wait_for_timeout(200)
        lists0 = pg.evaluate(lists_js)
        pg.locator("casita-panel").locator(".empty.local").get_by_role("button", name="Corriger").click()
        ok = wait_for(pg, f"!{sr}.querySelector('.empty.local')", 3000)
        upd = pg.evaluate(updates_js)
        want = {
            "type": "assist_pipeline/pipeline/update", "pipeline_id": "p-atelier", "name": "Atelier", "language": "fr",
            "conversation_engine": "conversation.casita_atelier", "conversation_language": "fr", "stt_engine": "stt.faster_whisper", "stt_language": "fr",
            "tts_engine": "tts.piper", "tts_language": "fr", "tts_voice": "fr_FR-upmc-medium", "wake_word_entity": "wake_word.openwakeword", "wake_word_id": "hey_jarvis",
            "prefer_local_intents": False,
        }
        check("fix: pipeline/update with every field, unchanged but prefer_local_intents false", len(upd) == 1 and upd[0] == want, upd)
        check("fix: the list is read again", pg.evaluate(lists_js) > lists0)
        check("fix: the banner disappears", ok)
        pg.locator("casita-panel").get_by_role("button", name="Réglages").click()
        pg.wait_for_timeout(300)
        check("fix: no warning left in the settings", pg.evaluate(dlg_warn_js) is None)
        pg.keyboard.press("Escape")
        inp = pg.locator("casita-panel").locator("#chat-input")
        inp.click()
        inp.fill("allume la lumière")
        inp.press("Enter")
        ok = wait_for(pg, "(() => { const d = dev.life(); return d.talk && d.expression === 'Happy'; })()", 6000)
        check("fix: simple commands now reach Casita (his emotion shows)", ok, life(pg)["expression"])
        done(pg, "local commands: fix")

        # admin: fix from the settings (en)
        pg = open_page(390, 844, True, "en", "&pipeline=p-atelier")
        pg.wait_for_timeout(3500)
        e = pg.evaluate(local_js)
        check("local (en): banner text and « Fix »", e and e["text"] == ["With this assistant, simple commands (\"turn on the light\") skip Casita: he won’t react to them."] and e["buttons"] == ["Fix"] and e["inside"], e)
        shot(pg, "local-390-dark-en-admin.png")
        pg.locator("casita-panel").get_by_role("button", name="Settings").tap()
        pg.wait_for_timeout(300)
        shot(pg, "local-settings-390-dark-en.png")
        pg.locator("casita-panel").locator("casita-settings-dialog").get_by_role("button", name="Fix").tap()
        ok = wait_for(pg, f"!{sr}.querySelector('casita-settings-dialog').shadowRoot.querySelector('.warning')", 3000)
        check("fix from the settings: the warning goes, in the dialog and the room", ok and pg.evaluate(f"!{sr}.querySelector('.empty.local')") and len(pg.evaluate(updates_js)) == 1)
        done(pg, "local commands: fix from settings")

        # failure: a clear message, the banner stays
        pg = open_page(1280, 800, False, "fr", "&pipeline=p-atelier&updatefail=1")
        pg.wait_for_timeout(3500)
        pg.locator("casita-panel").locator(".empty.local").get_by_role("button", name="Corriger").click()
        wait_for(pg, f"!!{sr}.querySelector('.empty.local .empty-error')", 3000)
        e = pg.evaluate(local_js)
        check("fix fails: a clear message, the banner stays", e and e["error"] and e["error"][0].startswith("Impossible de corriger l’assistant.") and not e["disabled"], e)
        shot(pg, "local-1280-light-fr-failed.png")
        pg.locator("casita-panel").get_by_role("button", name="Réglages").click()
        pg.wait_for_timeout(300)
        w = pg.evaluate(dlg_warn_js)
        check("fix fails: the message shows in the settings too", w and w["error"] and w["error"][0].startswith("Impossible de corriger l’assistant."), w)
        done(pg, "local commands: fix fails")

        # not an admin: ask one
        pg = open_page(1280, 800, False, "fr", "&pipeline=p-atelier&admin=0")
        pg.wait_for_timeout(3500)
        e = pg.evaluate(local_js)
        check("local (not admin): « Demande à un administrateur de corriger cet assistant. », no button", e and e["text"] == [fr_warn] and e["notes"] == ["Demande à un administrateur de corriger cet assistant."] and not e["buttons"], e)
        shot(pg, "local-1280-light-fr-user.png")
        pg.locator("casita-panel").get_by_role("button", name="Réglages").click()
        pg.wait_for_timeout(300)
        w = pg.evaluate(dlg_warn_js)
        check("local (not admin): settings say the same, no button", w and not w["buttons"] and w["notes"] == ["Demande à un administrateur de corriger cet assistant."], w)
        pg.keyboard.press("Escape")
        # turned off elsewhere: gone at the next read (back on the panel)
        pg.evaluate("dev.setPreferLocal('p-atelier', false)")
        pg.evaluate("Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange'))")
        pg.wait_for_timeout(100)
        pg.evaluate("Object.defineProperty(document, 'hidden', { configurable: true, get: () => false }); document.dispatchEvent(new Event('visibilitychange'))")
        ok = wait_for(pg, f"!{sr}.querySelector('.empty.local')", 3000)
        check("local: turned off elsewhere → the banner disappears", ok)
        done(pg, "local commands: not admin")

        # ------------------------------------------------------------------ G. interactions → casita.interact
        pg = open_page(1280, 800, False, "fr")
        pg.wait_for_timeout(4500)
        box = pg.evaluate(f"(() => {{ const b = {sr}.querySelector('casita-face').shadowRoot.querySelector('.casita-house').getBoundingClientRect(); return {{x: b.x, y: b.y, w: b.width, h: b.height}}; }})()")
        cx, face_y, roof_y = box["x"] + box["w"] / 2, box["y"] + box["h"] * 0.82, box["y"] + box["h"] * 0.28
        pg.mouse.move(cx + 40, face_y)
        pg.mouse.down()
        pg.mouse.up()
        pg.wait_for_timeout(250)
        calls = pg.evaluate("__calls.filter(c => c.service === 'interact').map(c => c.data)")
        check("interact: poke calls casita.interact", any(c["kind"] == "poke" for c in calls), calls)
        for _ in range(5):
            pg.mouse.down()
            pg.mouse.up()
            pg.wait_for_timeout(120)
        pg.wait_for_timeout(200)
        pokes = pg.evaluate("__calls.filter(c => c.service === 'interact' && c.data.kind === 'poke')")
        check("interact: throttled (≤ 1 call per kind per 2 s)", len(pokes) == 1, len(pokes))
        shot(pg, "interact-1-pokes.png")
        pg.wait_for_timeout(2300)
        pokes = pg.evaluate("__calls.filter(c => c.service === 'interact' && c.data.kind === 'poke').map(c => c.data.intensity)")
        check("interact: intensity aggregated in the next call", len(pokes) == 2 and pokes[1] > 0.5, pokes)
        pg.wait_for_timeout(4000)
        # petting the roof
        pg.mouse.move(cx - 40, roof_y)
        for i in range(26):
            pg.mouse.move(cx + (35 if i % 2 else -35), roof_y + (i % 3), steps=4)
            pg.wait_for_timeout(45)
        pg.wait_for_timeout(300)
        shot(pg, "interact-2-pet.png")
        pets = pg.evaluate("__calls.filter(c => c.data && c.data.kind === 'pet').length")
        check("interact: petting the roof → pet", pets >= 1, pets)
        pg.mouse.move(cx + 300, roof_y - 200, steps=5)
        pg.wait_for_timeout(2500)
        # drag and throw
        pg.mouse.move(cx, face_y)
        pg.mouse.down()
        for i in range(8):
            pg.mouse.move(cx + 30 * (i + 1), face_y - 25 * (i + 1), steps=2)
            pg.wait_for_timeout(16)
        pg.mouse.up()
        pg.wait_for_timeout(250)
        shot(pg, "interact-3-throw.png")
        throws = pg.evaluate("__calls.filter(c => c.data && c.data.kind === 'throw').map(c => c.data.intensity)")
        check("interact: drag & throw → throw", len(throws) >= 1, throws)
        pg.wait_for_timeout(3500)
        # long press = hug
        pg.mouse.move(cx, face_y)
        pg.mouse.down()
        pg.wait_for_timeout(1400)
        shot(pg, "interact-4-hug.png")
        pg.mouse.up()
        pg.wait_for_timeout(300)
        hugs = pg.evaluate("__calls.filter(c => c.data && c.data.kind === 'hug').length")
        check("interact: long press → hug", hugs >= 1, hugs)
        pg.wait_for_timeout(600)
        # keyboard: Space pokes when the room has focus
        n0 = pg.evaluate("__calls.length")
        pg.evaluate(f"{sr}.querySelector('.room').focus()")
        pg.wait_for_timeout(2100)
        pg.keyboard.press("Space")
        pg.wait_for_timeout(200)
        check("a11y: Space on the focused room pokes", pg.evaluate("__calls.length") > n0)
        shot(pg, "interact-5-keyboard.png")
        done(pg, "interactions")

        # ------------------------------------------------------------------ H. microphone (fake device) → STT run with 16 kHz PCM
        pg = open_page(1280, 800, False, "fr")
        pg.wait_for_timeout(3500)
        pg.locator("casita-panel").locator("button.mic").click()
        ok = wait_for(pg, "dev.life().phase === 'listen'", 4000)
        pg.wait_for_timeout(900)
        shot(pg, "mic-1-listening.png")
        run = pg.evaluate("__runs[0] && __runs[0].msg")
        check("mic: run from stt at 16 kHz", ok and run and run["start_stage"] == "stt" and run["input"]["sample_rate"] == 16000, run)
        wait_for(pg, "__binary.length > 5", 4000)
        b = pg.evaluate("__binary.slice(0, 5)")
        check("mic: PCM chunks prefixed with the binary handler id", len(b) >= 3 and all(x["handler"] == 7 and x["len"] == 641 for x in b), b)
        pg.wait_for_timeout(600)
        shot(pg, "mic-2-voice.png")
        ok = wait_for(pg, "__runs[0].events.includes('stt-end')", 5000)
        n_after = pg.evaluate("__binary.length")
        pg.wait_for_timeout(400)
        check("mic: recording stops at stt-end (server ended STT)", ok and pg.evaluate("__binary.length") == n_after and not pg.evaluate(f"{sr}.querySelector('button.mic').classList.contains('on')"))
        ok = wait_for(pg, "dev.life().expression === 'Happy'", 6000)
        check("mic: transcript → intent → reply", ok, life(pg)["expression"])
        note = pg.evaluate(f"({sr}.querySelector('.note') || {{}}).textContent || ''")
        check("mic: transcript shown under the pill", "allume" in note, note)
        shot(pg, "mic-3-reply.png")
        pg.wait_for_timeout(7000)
        # pressing the mic again while talking ends the audio stream with an empty chunk
        pg.locator("casita-panel").locator("button.mic").click()
        wait_for(pg, "__runs.length === 2 && __runs[1].events.includes('stt-start')", 4000)
        pg.wait_for_timeout(300)
        pg.locator("casita-panel").locator("button.mic").click()
        pg.wait_for_timeout(200)
        check("mic: stopping by hand ends the stream with an empty chunk", pg.evaluate("__binary.some(x => x.len === 1)"))
        done(pg, "microphone")

        # ------------------------------------------------------------------ I. reduced motion, offline, hidden tab
        pg = open_page(1280, 800, False, "en", reduced_motion="reduce")
        pg.wait_for_timeout(3500)
        shot(pg, "reduced-motion-1280.png")
        pg.evaluate("dev.disconnect(true)")
        pg.wait_for_timeout(600)
        d = life(pg)
        check("offline: connection lost → NoInternet", d["expression"] == "NoInternet", d["expression"])
        shot(pg, "offline.png")
        pg.evaluate("dev.disconnect(false)")
        pg.wait_for_timeout(500)
        check("offline: reconnect → Grinning", life(pg)["expression"] == "Grinning", life(pg)["expression"])
        clock0 = pg.evaluate(f"{sr}.querySelector('casita-face').face.clock")
        pg.evaluate("Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange'))")
        pg.wait_for_timeout(800)
        clock1 = pg.evaluate(f"{sr}.querySelector('casita-face').face.clock")
        pg.wait_for_timeout(800)
        clock2 = pg.evaluate(f"{sr}.querySelector('casita-face').face.clock")
        check("hidden tab: animation loop paused", clock2 == clock1, (clock0, clock1, clock2))
        pg.evaluate("Object.defineProperty(document, 'hidden', { configurable: true, get: () => false }); document.dispatchEvent(new Event('visibilitychange'))")
        pg.wait_for_timeout(500)
        clock3 = pg.evaluate(f"{sr}.querySelector('casita-face').face.clock")
        check("visible again: loop resumes", clock3 > clock2, (clock2, clock3))
        done(pg, "reduced motion / offline / hidden")

        browser.close()
    httpd.shutdown()
    failed = [r for r in results if not r[1]]
    print(f"\n{len(results) - len(failed)}/{len(results)} checks passed")
    (SHOTS / "results.json").write_text(json.dumps([{"check": n, "ok": o, "detail": d} for n, o, d in results], indent=1, ensure_ascii=False))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())

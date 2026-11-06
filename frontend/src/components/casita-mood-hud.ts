import { css, html, LitElement, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { define } from "../define";
import { MOOD_KEYS, type CasitaEntry, type MoodKey } from "../data/casita";
import type { HomeAssistant } from "../data/ha";
import type { Strings } from "../i18n";

/**
 * The six mood sensors, live from `hass.states`. Compact card, or a strip on narrow.
 * A value that changes while it is open glides to its new place and its row lights up
 * for a second; nothing shows anywhere else when it is closed.
 */
export class CasitaMoodHud extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  /** The selected Casita (its mood sensors). */
  @property({ attribute: false }) public entry?: CasitaEntry;

  /** Name of the Casita, shown when there are several. */
  @property() public heading = "";

  @property({ attribute: false }) public strings!: Strings;

  @property({ type: Boolean, reflect: true }) public narrow = false;

  private _prev = new Map<MoodKey, number>();

  private _lit = new Map<MoodKey, number>();

  private _litTimer?: ReturnType<typeof setTimeout>;

  public disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._litTimer);
    this._prev.clear();
    this._lit.clear();
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (!changed.has("hass") && !changed.has("entry")) return;
    const fresh = changed.has("entry");
    const now = Date.now();
    for (const k of MOOD_KEYS) {
      const v = this._value(k);
      const before = this._prev.get(k);
      if (v === undefined) continue;
      if (!fresh && before !== undefined && Math.abs(v - before) >= 0.005) this._lit.set(k, now);
      this._prev.set(k, v);
    }
    if (fresh) this._lit.clear();
    if ([...this._lit.values()].some((t) => now - t < 1000)) {
      clearTimeout(this._litTimer);
      this._litTimer = setTimeout(() => this.requestUpdate(), 1000);
    }
  }

  private _value(k: MoodKey): number | undefined {
    const id = this.entry?.mood_entities[k];
    const st = id ? this.hass?.states[id] : undefined;
    const v = st ? parseFloat(st.state) : NaN;
    return Number.isFinite(v) ? v : undefined;
  }

  protected render() {
    const S = this.strings;
    const values = MOOD_KEYS.map((k) => [k, this._value(k)] as const);
    const any = values.some(([, v]) => v !== undefined);
    return html`
      <div class="hud" role="group" aria-label=${this.heading ? `${S.mood} — ${this.heading}` : S.mood}>
        ${this.heading ? html`<p class="heading">${this.heading}</p>` : ""}
        ${any
          ? values.map(([k, v]) => {
              const div = k === "joy";
              const val = v ?? 0;
              const w = div ? Math.abs(val) * 50 : Math.max(0, Math.min(1, val)) * 100;
              const left = div ? (val < 0 ? 50 - w : 50) : 0;
              const shown = v === undefined ? "—" : div ? `${val >= 0 ? "+" : "−"}${Math.abs(val).toFixed(2)}` : val.toFixed(2);
              const id = this.entry?.mood_entities[k];
              const lit = Date.now() - (this._lit.get(k) ?? 0) < 1000;
              return html`<div class="row ${div ? "div" : ""} ${lit ? "lit" : ""} m-${k}" title=${id ?? ""}>
                <span class="name">${S.moodNames[k]}</span>
                <span class="bar" role="meter" aria-label=${S.moodNames[k]} aria-valuemin=${div ? -1 : 0} aria-valuemax="1" aria-valuenow=${val.toFixed(2)}
                  ><i style="left:${left}%;width:${w}%"></i
                ></span>
                <span class="val">${shown}</span>
              </div>`;
            })
          : html`<p class="empty">${S.moodUnavailable}</p>`}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      --hud-bar: var(--primary-color, #18bcf2);
    }
    .hud {
      background: var(--ha-card-background, var(--card-background-color, #fff));
      color: var(--primary-text-color, #13212c);
      border-radius: var(--ha-card-border-radius, 12px);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      box-shadow: var(--ha-card-box-shadow, 0 4px 16px rgba(0, 0, 0, 0.12));
      padding: 8px 14px;
      width: 248px;
      box-sizing: border-box;
    }
    .row {
      display: grid;
      grid-template-columns: 82px minmax(0, 1fr) 42px;
      align-items: center;
      gap: 8px;
      padding: 5px 0;
      font-size: 13px;
    }
    .row {
      margin: 0 -8px;
      padding-left: 8px;
      padding-right: 8px;
      border-radius: 6px;
      transition: background-color 0.6s ease-out;
    }
    .row.lit {
      background-color: color-mix(in srgb, var(--hud-bar) 16%, transparent);
      transition-duration: 0.15s;
    }
    .row + .row {
      border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
    }
    .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .bar {
      position: relative;
      height: 6px;
      border-radius: 6px;
      background: var(--secondary-background-color, #eef2f5);
      overflow: hidden;
    }
    .bar i {
      position: absolute;
      top: 0;
      bottom: 0;
      background: var(--hud-bar);
      border-radius: 6px;
      transition: width 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), left 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .m-irritation .bar i {
      background: var(--error-color, #db4437);
    }
    .div .bar::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 1px;
      background: var(--secondary-text-color, #5a6a77);
      opacity: 0.5;
    }
    .val {
      font-variant-numeric: tabular-nums;
      text-align: right;
      font-size: 12px;
      color: var(--secondary-text-color, #5a6a77);
    }
    .heading {
      margin: 2px 0 4px;
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color, #5a6a77);
    }
    :host([narrow]) .heading {
      display: none;
    }
    .empty {
      margin: 6px 0;
      font-size: 13px;
      color: var(--secondary-text-color, #5a6a77);
      max-width: 220px;
    }
    /* narrow: a strip under the header, 3 × 2 so the names stay whole at 390 px */
    :host([narrow]) .hud {
      width: 100%;
      border-radius: 0;
      border-width: 0 0 1px;
      box-shadow: none;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 6px 14px;
      padding: 6px 16px 8px;
    }
    :host([narrow]) .row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      grid-template-areas: "name val" "bar bar";
      gap: 2px 6px;
      margin: 0 -4px;
      padding: 2px 4px;
      border: 0;
      font-size: 12px;
      min-width: 0;
    }
    :host([narrow]) .name {
      grid-area: name;
    }
    :host([narrow]) .val {
      grid-area: val;
      font-size: 11px;
    }
    :host([narrow]) .bar {
      grid-area: bar;
      height: 4px;
    }
    :host([narrow]) .empty {
      grid-column: 1 / -1;
      max-width: none;
      margin: 0;
    }
    @media (prefers-reduced-motion: reduce) {
      .bar i {
        transition: none;
      }
    }
  `;
}
define("casita-mood-hud", CasitaMoodHud);

declare global {
  interface HTMLElementTagNameMap {
    "casita-mood-hud": CasitaMoodHud;
  }
}


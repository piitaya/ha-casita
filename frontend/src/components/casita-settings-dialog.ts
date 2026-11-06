import { css, html, LitElement, type PropertyValues } from "lit";
import { property, query } from "lit/decorators.js";
import { mdiClose, mdiMenuDown } from "../icons";
import { define } from "../define";
import type { HomeAssistant } from "../data/ha";
import type { CasitaSettings } from "../data/settings";
import type { AssistPipeline } from "../assist/pipeline";
import type { Strings } from "../i18n";

/**
 * Panel settings: only the assistant (Assist pipeline). A native <dialog> (modal, focus
 * trap, Esc) and a native <select> drawn like HA's filled select. `ha-dialog` and
 * `ha-select` are lazy loaded by the HA frontend and changed API across releases, so a
 * custom panel cannot count on them being defined.
 */
export class CasitaSettingsDialog extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false }) public strings!: Strings;

  @property({ attribute: false }) public settings!: CasitaSettings;

  @property({ attribute: false }) public pipelines?: { pipelines: AssistPipeline[]; preferred_pipeline: string | null };

  /** e.g. the pipeline lets local commands bypass Casita. */
  @property() public warning?: string;

  /** e.g. the pipeline does not use a Casita agent. */
  @property() public note?: string;

  /** What the empty choice resolves to (the preferred assistant, or the first Casita one). */
  @property() public defaultId?: string;

  @property({ type: Boolean }) public open = false;

  @query("dialog") private _dialog?: HTMLDialogElement;

  protected updated(changed: PropertyValues<this>) {
    const dialog = this._dialog;
    if (!changed.has("open") || !dialog) return;
    if (this.open && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLElement>("select")?.focus();
    } else if (!this.open && dialog.open) dialog.close();
  }

  private _change(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    const settings: CasitaSettings = value ? { pipeline_id: value } : {};
    this.dispatchEvent(new CustomEvent("settings-changed", { detail: { settings } }));
  }

  private _close() {
    this._dialog?.close();
  }

  private _onClose = () => {
    this.dispatchEvent(new CustomEvent("closed"));
  };

  private _backdrop = (ev: MouseEvent) => {
    if (ev.target === this._dialog) this._close();
  };

  protected render() {
    const S = this.strings;
    if (!S || !this.hass) return html`<dialog></dialog>`;
    const list = this.pipelines?.pipelines ?? [];
    const preferredId = this.pipelines?.preferred_pipeline;
    const fallback = list.find((p) => p.id === (this.defaultId ?? preferredId));
    const defaultLabel = fallback
      ? `${fallback.name} (${fallback.id === preferredId ? S.preferred : S.byDefault})`
      : `Assist (${S.preferred})`;
    const current = this.settings?.pipeline_id;
    return html`
      <dialog aria-labelledby="title" @close=${this._onClose} @click=${this._backdrop}>
        <div class="head">
          <h2 id="title">${S.settingsTitle}</h2>
          <button class="icon" type="button" aria-label=${S.close} @click=${this._close}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${mdiClose}></path></svg>
          </button>
        </div>
        <div class="body">
          <div class="field">
            <div class="select">
              <label for="pipeline">${S.pipeline}</label>
              <select id="pipeline" aria-describedby="pipeline-help" .value=${current ?? ""} @change=${this._change}>
                <option value="" ?selected=${!current}>${defaultLabel}</option>
                ${list.map((p) => html`<option value=${p.id} ?selected=${current === p.id}>${p.name}</option>`)}
              </select>
              <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d=${mdiMenuDown}></path></svg>
            </div>
            <span class="help" id="pipeline-help">${S.pipelineHelp}</span>
            ${this.warning ? html`<span class="warning" role="note">${this.warning}</span>` : ""}
            ${this.note ? html`<span class="note" role="note">${this.note}</span>` : ""}
          </div>
          <p class="foot">${S.savedUser}</p>
        </div>
      </dialog>
    `;
  }

  static styles = css`
    dialog {
      border: 0;
      padding: 0;
      width: min(440px, calc(100vw - 32px));
      max-height: calc(100vh - 48px);
      border-radius: var(--ha-dialog-border-radius, 24px);
      background: var(--ha-dialog-surface-background, var(--mdc-theme-surface, var(--card-background-color, #fff)));
      color: var(--primary-text-color, #13212c);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
      font-family: var(--ha-font-family-body, Roboto, system-ui, sans-serif);
    }
    dialog::backdrop {
      background: var(--mdc-dialog-scrim-color, rgba(0, 0, 0, 0.32));
    }
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 12px 4px 24px;
    }
    h2 {
      margin: 0;
      font-size: var(--ha-font-size-2xl, 22px);
      font-weight: var(--ha-font-weight-normal, 400);
    }
    .body {
      padding: 12px 24px 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      overflow: auto;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    /* a filled select like ha-select: floating label, value below, chevron, bottom line */
    .select {
      position: relative;
      border-radius: 4px 4px 0 0;
      background: var(--mdc-text-field-fill-color, var(--input-fill-color, var(--secondary-background-color, #f5f5f5)));
      box-shadow: inset 0 -1px 0 var(--mdc-text-field-idle-line-color, var(--input-idle-line-color, rgba(0, 0, 0, 0.42)));
      transition: box-shadow 0.15s;
    }
    .select:hover {
      box-shadow: inset 0 -1px 0 var(--mdc-text-field-hover-line-color, var(--input-hover-line-color, rgba(0, 0, 0, 0.87)));
    }
    .select:focus-within {
      box-shadow: inset 0 -2px 0 var(--primary-color, #009ac7);
    }
    .select label {
      position: absolute;
      left: 16px;
      top: 8px;
      font-size: 12px;
      line-height: 16px;
      color: var(--mdc-text-field-label-ink-color, var(--secondary-text-color, #727272));
      pointer-events: none;
    }
    .select:focus-within label {
      color: var(--primary-color, #009ac7);
    }
    select {
      appearance: none;
      -webkit-appearance: none;
      display: block;
      width: 100%;
      box-sizing: border-box;
      font: inherit;
      font-size: 16px;
      line-height: 24px;
      color: var(--mdc-text-field-ink-color, var(--primary-text-color, #212121));
      background: transparent;
      border: 0;
      padding: 24px 44px 8px 16px;
      min-height: 56px;
      cursor: pointer;
    }
    select:focus {
      outline: none;
    }
    select option {
      color: var(--primary-text-color, #212121);
      background: var(--card-background-color, #fff);
    }
    .arrow {
      position: absolute;
      right: 12px;
      top: 50%;
      width: 24px;
      height: 24px;
      margin-top: -12px;
      fill: var(--secondary-text-color, #727272);
      pointer-events: none;
    }
    .select:focus-within .arrow {
      fill: var(--primary-color, #009ac7);
    }
    .help,
    .note,
    .foot {
      font-size: 12px;
      line-height: 1.4;
      color: var(--secondary-text-color, #727272);
      padding: 0 16px;
    }
    .foot {
      margin: 0;
      padding: 0;
    }
    .warning {
      font-size: 12px;
      line-height: 1.4;
      margin-top: 4px;
      padding: 6px 10px;
      border-radius: 8px;
      background: color-mix(in srgb, var(--warning-color, #ffa600) 16%, transparent);
      border-left: 3px solid var(--warning-color, #ffa600);
    }
    .note {
      font-style: italic;
    }
    .icon {
      width: 40px;
      height: 40px;
      border: 0;
      border-radius: 50%;
      background: transparent;
      color: var(--secondary-text-color, #5a6a77);
      display: grid;
      place-items: center;
      cursor: pointer;
    }
    .icon:hover {
      background: rgba(127, 127, 127, 0.12);
    }
    .icon:focus-visible {
      outline: 2px solid var(--primary-color, #18bcf2);
    }
    .icon svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
    @media (prefers-reduced-motion: reduce) {
      .select {
        transition: none;
      }
    }
  `;
}
define("casita-settings-dialog", CasitaSettingsDialog);

declare global {
  interface HTMLElementTagNameMap {
    "casita-settings-dialog": CasitaSettingsDialog;
  }
}

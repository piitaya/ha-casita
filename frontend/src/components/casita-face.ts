import { css, html, LitElement, type PropertyValues } from "lit";
import { property, query } from "lit/decorators.js";
import { Casita } from "../engine/engine.js";
import type { Face } from "../engine/engine.js";
import { define } from "../define";

/**
 * Casita's face: an SVG driven by the parametric engine.
 *
 * Standalone (`controlled` unset) it runs its own loop with idle life and follows
 * `expression`. In the panel it is `controlled`: the life controller steps it every frame.
 */
export class CasitaFace extends LitElement {
  @property() public expression = "Normal";

  /** An external driver calls `face.step(dt)`; no loop of its own. */
  @property({ type: Boolean }) public controlled = false;

  @property({ type: Boolean, attribute: "reduced-motion" }) public reducedMotion = false;

  /** Accessible name of the drawing. */
  @property() public label = "Casita";

  @query("svg", true) public svg!: SVGSVGElement;

  private _face?: Face;

  public get face(): Face | undefined {
    return this._face;
  }

  protected firstUpdated() {
    this._create();
  }

  public connectedCallback() {
    super.connectedCallback();
    if (this.hasUpdated && !this._face) this._create();
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    this._face?.destroy();
    this._face = undefined;
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("expression") && this._face && !this.controlled && this._face.expression !== this.expression) {
      this._face.setExpression(this.expression);
    }
  }

  private _create() {
    this._face = Casita.create(this.svg, {
      expression: this.expression,
      life: true,
      autoplay: !this.controlled,
      reducedMotion: this.reducedMotion,
      floor: 0,
    });
    this.dispatchEvent(new CustomEvent("face-ready", { detail: { face: this._face } }));
  }

  protected render() {
    return html`<svg role="img" aria-label=${this.label} part="svg"></svg>`;
  }

  static styles = css`
    :host {
      display: block;
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
      display: block;
    }
    .casita-shadow {
      fill: var(--shadow, #16324a);
      fill-opacity: 0.16;
    }
  `;
}
define("casita-face", CasitaFace);

declare global {
  interface HTMLElementTagNameMap {
    "casita-face": CasitaFace;
  }
}

/**
 * Defines a custom element once. The panel module can be imported again after an update
 * (new `?v=` cache buster without a page reload): a second define would throw.
 */
export const define = (name: string, ctor: CustomElementConstructor) => {
  if (!customElements.get(name)) customElements.define(name, ctor);
};

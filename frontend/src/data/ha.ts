/**
 * The small part of the Home Assistant frontend types this panel uses.
 * Kept local so the bundle does not depend on the HA frontend repo.
 */

export type UnsubscribeFunc = () => void | Promise<void>;

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

export type HassEntities = Record<string, HassEntity>;

export interface EntityRegistryDisplayEntry {
  entity_id: string;
  device_id?: string | null;
  name?: string | null;
  translation_key?: string;
  platform?: string;
}

export interface HassEvent<T = Record<string, any>> {
  event_type: string;
  data: T;
  origin?: string;
  time_fired?: string;
}

export interface Connection {
  connected?: boolean;
  socket?: WebSocket | null;
  subscribeMessage<T>(
    callback: (msg: T) => void,
    msg: Record<string, unknown>,
    options?: { resubscribe?: boolean }
  ): Promise<UnsubscribeFunc>;
  subscribeEvents<T>(
    callback: (ev: HassEvent<T>) => void,
    eventType?: string
  ): Promise<UnsubscribeFunc>;
  addEventListener?(event: string, cb: (...args: any[]) => void): void;
  removeEventListener?(event: string, cb: (...args: any[]) => void): void;
}

export interface HomeAssistant {
  states: HassEntities;
  entities?: Record<string, EntityRegistryDisplayEntry>;
  connection: Connection;
  connected?: boolean;
  language: string;
  locale?: { language: string };
  /** Core config: `language` is the language of the system. */
  config?: { language?: string; country?: string | null };
  themes?: { darkMode?: boolean };
  user?: { id: string; name: string; is_admin: boolean };
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: Record<string, unknown>
  ): Promise<unknown>;
  hassUrl(path?: string): string;
}

export interface Route {
  prefix: string;
  path: string;
}

export interface PanelInfo<C = Record<string, unknown>> {
  component_name?: string;
  url_path?: string;
  title?: string | null;
  config?: C;
}

/** `config` of the panel_custom registration (contract v0.2). */
export interface CasitaPanelConfig {
  _panel_custom?: { name: string; module_url?: string };
  entry_id?: string;
  version?: string;
}

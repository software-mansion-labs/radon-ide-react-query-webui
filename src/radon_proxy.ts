import * as flatted from "flatted";

export interface ProxyClient {
  sendMessage: (type: string, data?: any) => void;
  addMessageListener: (method: string, listener: (params: any) => void) => void;
}

export type ProxyClientFactory = () => Promise<ProxyClient>;

// @ts-ignore
const vscode = acquireVsCodeApi();

class RNIDEProxyClient implements ProxyClient {
  private scope: string;
  private listeners: Map<string, ((params: any) => void)[]> = new Map();

  constructor(scope: string) {
    this.scope = scope;

    window.addEventListener("message", this.handleMessage);
  }

  private handleMessage = (event: MessageEvent) => {
    const message = event.data;
    if (message.scope === this.scope) {
      const payload = message.data;
      this.listeners
        .get(payload.type)
        ?.forEach((listener) => listener(flatted.parse(payload.data)));
    }
  };

  sendMessage = (type: string, data?: any) => {
    vscode.postMessage({
      scope: this.scope,
      type,
      data,
    });
  };

  addMessageListener = (type: string, listener: (params: any) => void) => {
    const currentListeners = this.listeners.get(type) || [];
    this.listeners.set(type, [...currentListeners, listener]);
  };

  removeMessageListener = (type: string, listener: (params: any) => void) => {
    const currentListeners = this.listeners.get(type) || [];
    const filteredListeners = currentListeners.filter((l) => l !== listener);
    this.listeners.set(type, filteredListeners);
  };
}

export const createRNIDEProxyClient = (scope: string) =>
  new RNIDEProxyClient(scope);

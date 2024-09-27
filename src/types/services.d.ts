declare namespace Services {

  interface Storage {
    store(body: unknown, path: string, tags?: Record<string, string | number>): Promise<void>;

    retrieve(path: string): Promise<unknown>;

    delete(path: string): Promise<void>;
  }

  interface Queue {
    sendMessage(message: unknown): Promise<unknown>;
  }
}

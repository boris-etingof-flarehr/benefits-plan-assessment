import axios, { AxiosInstance } from 'axios';

export abstract class BackendApiBase {
  #client: AxiosInstance | undefined;
  protected abstract url(baseUrl: string): string;

  initClient(baseUrl: string, headers: Record<string, string>): void {
    this.#client = axios.create({
      baseURL: `${this.url(baseUrl)}/backend`,
      headers
    });
  }

  getClient(): AxiosInstance {
    return this.#client!;
  }
}

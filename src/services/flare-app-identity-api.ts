import axios, { AxiosInstance } from 'axios';

const backend = {
  client: undefined as AxiosInstance | undefined,
  initClient: (baseUrl: string, headers: Record<string, string>): void => {
    backend.client = axios.create({
      baseURL: import.meta.env.DEV
        ? 'http://localhost:7074/backend'
        : `${baseUrl}/flare-app-identity/backend`,
      headers
    });
  },
  getClient: (): AxiosInstance => backend.client!
};

export const backendApi: Readonly<{
  initClient: (baseUrl: string, headers: Record<string, string>) => void;
  getClient: () => AxiosInstance;
}> = backend;

export const getIdToken = (): Promise<string> =>
  backend
    .getClient()
    .get<{ token: string }>('v1.0/auth/token')
    .then((res) => res.data.token);

import axios, { AxiosInstance } from 'axios';

import { getIdToken as getAccessToken } from './flare-app-identity-api';

const workplaceBackend = {
  client: undefined as AxiosInstance | undefined,
  accessToken: undefined as string | undefined,
  initClient: (baseUrl: string, headers: Record<string, string>): void => {
    workplaceBackend.client = axios.create({
      baseURL: import.meta.env.DEV
        ? 'http://localhost:7025/workplace-backend'
        : `${baseUrl}/benefits-plan/workplace-backend`,
      headers
    });

    workplaceBackend.client.interceptors.request.use(async (req) => {
      if (!workplaceBackend.accessToken) {
        workplaceBackend.accessToken = await getAccessToken();
      }

      req.headers.Authorization = `Bearer ${workplaceBackend.accessToken}`;
      req.params = { ...(req.params ?? {}), client: 'onboarding' };

      return req;
    });
  },
  getClient: (): AxiosInstance => workplaceBackend.client!
};

export const workplaceBackendApi: Readonly<{
  initClient: (baseUrl: string, headers: Record<string, string>) => void;
  getClient: () => AxiosInstance;
}> = workplaceBackend;

import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { flareAppIdentityApi } from './flare-app-identity-api';

let accessToken: string | undefined;

export abstract class WorkplaceBackendApiBase {
  #client: AxiosInstance | undefined;
  #accessTokenInterceptor = async (
    req: InternalAxiosRequestConfig<unknown>
  ): Promise<InternalAxiosRequestConfig<unknown>> => {
    if (!accessToken) {
      accessToken = await flareAppIdentityApi.backend.getIdToken();
    }

    req.headers.Authorization = `Bearer ${accessToken}`;
    req.params = { ...(req.params ?? {}), client: 'onboarding', source: 'Onboarding', channel: 'onboarding' };

    return req;
  };

  protected abstract url(baseUrl: string): string;

  initClient(baseUrl: string, profileId: string, headers: Record<string, string>): void {
    this.#client = axios.create({
      baseURL: `${this.url(baseUrl)}/workplace-backend`,
      headers: { ...headers, 'X-PROFILE-ID': profileId }
    });

    this.#client.interceptors.request.use(this.#accessTokenInterceptor);
  }

  getClient(): AxiosInstance {
    return this.#client!;
  }
}

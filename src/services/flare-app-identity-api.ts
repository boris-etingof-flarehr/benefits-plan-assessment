import { BackendApiBase } from './backend-api';

class Backend extends BackendApiBase {
  url(baseUrl: string): string {
    return import.meta.env.DEV ? 'http://localhost:7074' : `${baseUrl}/flare-app-identity`;
  }

  getIdToken = (): Promise<string> =>
    this.getClient()
      .get<{ token: string }>('v1.0/auth/token')
      .then((res) => res.data.token);
}

export const flareAppIdentityApi = {
  backend: new Backend()
};

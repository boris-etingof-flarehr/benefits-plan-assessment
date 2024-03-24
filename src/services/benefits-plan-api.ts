import { WorkplaceBackendApiBase } from './workplace-backend-api';

class WorkplaceBackend extends WorkplaceBackendApiBase {
  url(baseUrl: string): string {
    return import.meta.env.DEV ? 'http://localhost:7025' : `${baseUrl}/benefits-plan`;
  }
}

export const benefitsPlanApi = {
  workplaceBackend: new WorkplaceBackend()
};

import { BackendApi as onboardingBackendApi } from './backend-api';
import { workplaceBackendApi as benefitsPlanWorkplaceBackendApi } from './benefits-plan-api';
import { backendApi as flareAppIdentityBackendApi } from './flare-app-identity-api';

const DEV_HEADERS = {
  'X-CUSTOMER-ID': 'BC-1348ab10-244b-4da3-b7cd-254b335030f3',
  'X-PARTNER-ID': '123',
  'X-ACCOUNT-ID': '83A9F426-8E73-4781-B6CA-ABC374510C54',
  'X-PROFILE-ID': 'AP-C0F67937-835B-44C4-9F1E-22761E2E86DC'
};

export const initApi = (baseUrl: string, backendAccessToken: string, sourceId: string): void => {
  const headers = {
    backend: import.meta.env.DEV ? DEV_HEADERS : { Authorization: `Bearer ${backendAccessToken}` },
    workplaceBackend: import.meta.env.DEV ? DEV_HEADERS : {}
  };

  onboardingBackendApi.initClient(baseUrl, headers.backend, sourceId);

  flareAppIdentityBackendApi.initClient(baseUrl, headers.backend);

  benefitsPlanWorkplaceBackendApi.initClient(baseUrl, headers.workplaceBackend);
};

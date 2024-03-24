import { jwtDecode } from 'jwt-decode';

import { benefitsOnboardingApi } from './benefits-onboarding-api';
import { benefitsPlanApi } from './benefits-plan-api';
import { flareAppIdentityApi } from './flare-app-identity-api';

export * from './benefits-onboarding-api';
export { benefitsPlanApi } from './benefits-plan-api';
export { flareAppIdentityApi } from './flare-app-identity-api';

const DEV_HEADERS = {
  'X-CUSTOMER-ID': 'BC-1348ab10-244b-4da3-b7cd-254b335030f3',
  'X-PARTNER-ID': '123',
  'X-ACCOUNT-ID': 'BDF4C917-3E77-4FA0-A5AA-6D219A135184',
  'X-PROFILE-ID': 'AP-C0F67937-835B-44C4-9F1E-22761E2E86DC'
};

export const initApi = (baseUrl: string, backendAccessToken: string, sourceId: string): void => {
  const profileId = jwtDecode(backendAccessToken).sub!;

  const headers = {
    backend: import.meta.env.DEV ? DEV_HEADERS : { Authorization: `Bearer ${backendAccessToken}` },
    workplaceBackend: import.meta.env.DEV ? DEV_HEADERS : {}
  };

  benefitsOnboardingApi.backend.initClient(baseUrl, headers.backend, sourceId);
  benefitsOnboardingApi.workplaceBackend.initClient(baseUrl, profileId, headers.workplaceBackend);

  flareAppIdentityApi.backend.initClient(baseUrl, headers.backend);

  benefitsPlanApi.workplaceBackend.initClient(baseUrl, profileId, headers.workplaceBackend);
};

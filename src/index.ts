import register from 'preact-custom-element';

import App from './app';

export const BenefitsOnboardingCustomElementName = 'benefits-onboarding';

register(App, BenefitsOnboardingCustomElementName, [], {
  shadow: true
});

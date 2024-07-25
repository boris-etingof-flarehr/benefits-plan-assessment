import register from 'preact-custom-element';

import App from './app';

export const BenefitsOnboardingCustomElementName = 'benefits-plan-assessment';

register(App, BenefitsOnboardingCustomElementName, [], {
  shadow: true
});

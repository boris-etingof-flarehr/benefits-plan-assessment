import App from './components/app';
import register from 'preact-custom-element';

export const BenefitsOnboardingCustomElementName = 'benefits-onboarding';

register(App, BenefitsOnboardingCustomElementName, [], {
  shadow: true
});

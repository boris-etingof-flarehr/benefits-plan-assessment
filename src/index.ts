import App from './components/app';
import register from 'preact-custom-element';

register(App, 'benefits-onboarding', ['backend-url', 'access-token'], {
  shadow: true
});

import { FunctionalComponent } from 'preact';
import { BenefitsOnboardingCustomElementName } from '../../index';
import desktopImg from '../../assets/desktop/get-app.jpg';
import mobileImg from '../../assets/mobile/get-app-mobile.jpg';
import StepTemplate from './step-template';
import { BackendApi } from '../../services/backend-api';
import AppleIcon from '../../assets/icons/apple.svg';
import GooglePlayIcon from '../../assets/icons/google-play.svg';
import { useEffect } from 'preact/hooks';

interface Props {
  step: { current: number; total: number };
  email: string;
}

const GetApp: FunctionalComponent<Props> = (props) => {
  useEffect(() => {
    (async (): Promise<void> => {
      await BackendApi.command({ name: 'ViewSummary' });
    })();
  }, []);

  return (
    <StepTemplate
      header={{ title: 'GET THE APP', step: props.step }}
      image={{ mobileSrc: mobileImg, desktopSrc: desktopImg }}
      title="Check your email"
      info={`We’ve sent an email to ${props.email} with instructions on how to download and activate the Flare App and Card.`}
      button={{
        text: 'Continue',
        class: 'mt-6 md:mt-14',
        onClick: async (): Promise<void> => {
          await BackendApi.command({ name: 'Complete' });
          const root = document.querySelector(BenefitsOnboardingCustomElementName);
          const event = new CustomEvent('step-completion', { bubbles: true });
          root?.dispatchEvent(event);
          await new Promise((_) => setTimeout(_, 10000));
        }
      }}
    >
      <div class="mt-6 flex space-x-6">
        <AppleIcon />
        <GooglePlayIcon />
      </div>
    </StepTemplate>
  );
};

export default GetApp;

import { FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';

import { BenefitsOnboardingCustomElementName } from '../../index';
import desktopImg from '../../assets/desktop/get-app.jpg';
import mobileImg from '../../assets/mobile/get-app-mobile.jpg';
import { BackendApi } from '../../services/backend-api';
import AppleIcon from '../../assets/icons/apple.svg';
import GooglePlayIcon from '../../assets/icons/google-play.svg';
import SimpleTemplate from './templates/simple-template';

interface Props {
  step: { current: number; total: number };
  email: string;
}

const GetApp: FunctionalComponent<Props> = (props) => {
  useEffect(() => {
    (async (): Promise<void> => {
      await BackendApi.command({ eventType: 'SummaryViewed', summaryVariant: 'app' });
    })();
  }, []);

  return (
    <SimpleTemplate
      stepNumber={props.step}
      step={{
        content: {
          imageUrl: desktopImg,
          mobileImageUrl: mobileImg,
          title: 'Check your email',
          description: `We’ve sent an email to ${props.email} with instructions on how to download and activate the Flare App and Card.`
        }
      }}
      primaryButton={{
        text: 'Continue',
        class: 'mt-6 md:mt-14',
        onClick: async (): Promise<void> => {
          await BackendApi.command({ eventType: 'Completed' });
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
    </SimpleTemplate>
  );
};

export default GetApp;

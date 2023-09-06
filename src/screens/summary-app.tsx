import { FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';

import desktopImg from '../assets/desktop/get-app.jpg';
import AppleIcon from '../assets/icons/apple.svg';
import GooglePlayIcon from '../assets/icons/google-play.svg';
import mobileImg from '../assets/mobile/get-app-mobile.jpg';
import Button from '../components/button';
import { BenefitsOnboardingCustomElementName } from '../index';
import LeftRightLayout from '../layouts/left-right-layout';
import { BackendApi } from '../services/backend-api';

interface Props {
  email: string;
}

const SummaryApp: FunctionalComponent<Props> = (props) => {
  useEffect(() => {
    (async (): Promise<void> => {
      await BackendApi.command({ eventType: 'SummaryViewed', summaryVariant: 'app' });
    })();
  }, []);

  const content = {
    imageUrl: desktopImg,
    mobileImageUrl: mobileImg,
    title: 'Check your email',
    description: `We’ve sent an email to ${props.email} with instructions on how to download and activate the Flare App and Card.`
  };

  const primaryButton = {
    text: 'Continue',
    class: 'mt-6 md:mt-14',
    onClick: async (): Promise<void> => {
      await BackendApi.command({ eventType: 'Completed' });
      const root = document.querySelector(BenefitsOnboardingCustomElementName);
      const event = new CustomEvent('step-completion', { bubbles: true });
      root?.dispatchEvent(event);
      await new Promise((_) => setTimeout(_, 10000));
    }
  };

  return (
    <LeftRightLayout>
      <LeftRightLayout.Left>
        <div>
          <img
            class="mt-4 max-w-full w-full mx-auto md:hidden"
            src={content.mobileImageUrl}
            loading="lazy"
          />
          <div class="md:max-w-[27.5rem]">
            <h3 class="mt-8 md:mt-3 text-2xl md:text-3xl leading-8 md:leading-9 font-bold">
              {content.title}
            </h3>
            <p class="mt-2 text-base md:text-lg leading-6 md:leading-7 text-gray-600 break-words">
              {content.description}
            </p>
          </div>

          <div class="mt-6 flex space-x-6">
            <AppleIcon />
            <GooglePlayIcon />
          </div>

          <Button class={primaryButton.class ?? ''} onClickPromise={primaryButton.onClick}>
            {primaryButton.text ?? 'Next'}
          </Button>
        </div>
      </LeftRightLayout.Left>

      <LeftRightLayout.Right>
        <img class="max-w-[30rem] w-full hidden md:block" src={content.imageUrl} loading="lazy" />
      </LeftRightLayout.Right>
    </LeftRightLayout>
  );
};

export default SummaryApp;

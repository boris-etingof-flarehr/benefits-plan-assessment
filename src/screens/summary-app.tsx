import useTrace from '@app/hooks/use-trace';
import { FunctionalComponent } from 'preact';
import { useContext, useEffect } from 'preact/hooks';

import { CustomerIdentity } from '../app.model';
import desktopImg from '../assets/desktop/get-app.jpg';
import AppleIcon from '../assets/icons/apple.svg';
import GooglePlayIcon from '../assets/icons/google-play.svg';
import mobileImg from '../assets/mobile/get-app-mobile.jpg';
import Button from '../components/button';
import { AppContext } from '../context/app-context';
import { BenefitsOnboardingCustomElementName } from '../index';
import LeftRightLayout from '../layouts/left-right-layout';

const SummaryApp: FunctionalComponent = () => {
  const { trace } = useTrace();

  useEffect(() => {
    (async (): Promise<void> => {
      await trace({ type: 'summary-viewed', data: { summaryVariant: 'app' } });
    })();
  }, []);

  const { identity } = useContext(AppContext);

  const content = {
    ...getContentTitleAndDescription(identity),
    imageUrl: desktopImg,
    mobileImageUrl: mobileImg
  };

  const primaryButton = {
    text: 'Continue',
    class: 'mt-6 md:mt-14',
    onClick: async (): Promise<void> => {
      await trace('completed');
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

const getContentTitleAndDescription = (
  identity: CustomerIdentity
): { title: string; description: string } => {
  
  switch (identity.registrationStatus) {
    case 'RegistrationAbandoned':
      return {
        title: 'Join your workplace',
        description: `We’ve sent an email to ${identity.email} with instructions on how to join your workplace. This will enable you to access all your workplace benefits through the Flare app in the future.`
      };
    case 'NewlyRegistered':
      return {
        title: 'Join your workplace’s benefits program',
        description: `We’ve sent an email to ${identity.email} with instructions on how to download the Flare app - where your company’s benefits live.`
      };
    default:
      return {
        title: 'Check your email',
        description: `We’ve sent an email to ${identity.email} with instructions on how to download and activate the Flare App and Card.`
      };
  }
};

export default SummaryApp;

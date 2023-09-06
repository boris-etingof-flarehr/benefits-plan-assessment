import { FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';

import desktopImg from '../assets/desktop/all-set.jpg';
import mobileImg from '../assets/mobile/all-set-mobile.jpg';
import Button from '../components/button';
import { BenefitsOnboardingCustomElementName } from '../index';
import LeftRightLayout from '../layouts/left-right-layout';
import { BackendApi } from '../services/backend-api';

const SummaryGeneric: FunctionalComponent = () => {
  useEffect(() => {
    (async (): Promise<void> => {
      await BackendApi.command({ eventType: 'SummaryViewed', summaryVariant: 'generic' });
    })();
  }, []);

  const content = {
    imageUrl: desktopImg,
    mobileImageUrl: mobileImg,
    title: "You're all set!",
    description:
      'Simply continue and review the details you have provided to complete your onboarding.'
  };

  const primaryButton = {
    text: 'Continue',
    class: 'mt-6 md:mt-6',
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

          <div class="flex flex-col md:flex-row md:justify-between gap-4 md:max-w-[27.5rem] mt-6 md:mt-11">
            <Button class={primaryButton.class ?? ''} onClickPromise={primaryButton.onClick}>
              {primaryButton.text ?? 'Next'}
            </Button>
          </div>
        </div>
      </LeftRightLayout.Left>

      <LeftRightLayout.Right>
        <img class="max-w-[30rem] w-full hidden md:block" src={content.imageUrl} loading="lazy" />
      </LeftRightLayout.Right>
    </LeftRightLayout>
  );
};

export default SummaryGeneric;

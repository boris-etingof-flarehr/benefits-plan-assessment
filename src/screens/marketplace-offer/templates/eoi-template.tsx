import { Transition } from '@headlessui/react';
import DOMPurify from 'dompurify';
import { FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';

import { MarketplaceOffer } from '../../../app.model';
import Button from '../../../components/button';
import LeftRightLayout from '../../../layouts/left-right-layout';
import { BackendApi } from '../../../services/backend-api';
import LearnMore from '../learn-more';
import LearnMorePanel from '../learn-more-panel';

interface Props {
  stepNumber: {
    current: number;
    total: number;
  };
  step: MarketplaceOffer;
  primaryButton: { text?: string; class?: string; onClick: () => void };
  secondaryButton: { text?: string; class?: string; onClick: () => void };
}

const EoiTemplate: FunctionalComponent<Props> = (props) => {
  useEffect(() => {
    (async (): Promise<void> => {
      await BackendApi.command({
        offerName: props.step.name,
        eventType: 'OfferViewed',
        data: {
          ...props.step.metadata
        }
      });
    })();
  }, [props.step.name]);

  const handleButtonClick = async (accepted: boolean): Promise<void> => {
    await BackendApi.command({
      offerName: props.step.name,
      eventType: 'OfferProgressed',
      data: {
        ...props.step.metadata,
        template: 'Eoi',
        accepted: accepted
      }
    });

    const button = accepted ? props.primaryButton : props.secondaryButton;
    return button.onClick();
  };

  return (
    <LeftRightLayout>
      <LeftRightLayout.Left>
        <div>
          <div class="flex justify-between md:block text-xs tracking-wide">
            <span class="relative px-3 py-0.5 text-primary-base font-semibold">
              {props.stepNumber.current} OF {props.stepNumber.total}
              <span class="absolute left-0 rounded-xl bg-primary-base opacity-10 w-full h-[90%]" />
            </span>
          </div>
          <Transition
            appear={true}
            show={true}
            enter="transition duration-700 ease-out md:transition-none"
            enterFrom="-translate-y-6"
            enterTo="translate-y-0"
          >
            <img
              class="mt-4 max-w-full w-full mx-auto md:hidden"
              src={props.step.content.mobileImageUrl}
              loading="lazy"
            />
            <div class="md:max-w-[27.5rem]">
              <h3 class="mt-8 md:mt-3 text-2xl md:text-3xl leading-8 md:leading-9 font-bold">
                {props.step.content.title}
              </h3>
              <p class="mt-2 text-base md:text-lg leading-6 md:leading-7 text-gray-600 break-words">
                {props.step.content.description}
              </p>
              {props.step.content.details && (
                <div class="mt-6 hidden md:block">
                  <LearnMorePanel items={props.step.content.details} />
                </div>
              )}
            </div>
            {props.step.content.details && (
              <LearnMore class="mt-6 md:hidden" items={props.step.content.details} />
            )}
            {props.children && props.children}
            <div class="flex flex-col md:flex-row md:justify-between gap-4 md:max-w-[27.5rem] mt-6 md:mt-11">
              <Button
                class={props.primaryButton.class ?? ''}
                onClickPromise={(): Promise<void> => {
                  return handleButtonClick(true);
                }}
              >
                {props.primaryButton.text ?? 'Next'}
              </Button>
              {props.secondaryButton?.text && (
                <Button
                  class={
                    props.secondaryButton.class ??
                    'bg-white hover:!bg-gray-100 focus:!ring-gray-200 !border-0 !shadow-none !text-gray-700 !border-gray-300'
                  }
                  onClickPromise={(): Promise<void> => {
                    return handleButtonClick(false);
                  }}
                >
                  {props.secondaryButton.text}
                </Button>
              )}
            </div>
            {props.step.content.terms && (
              <div class="flex flex-col gap-3 mt-6 text-gray-600 text-xs">
                {props.step.content.terms.map((termsAndCondition, index) => (
                  <span
                    key={index}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(termsAndCondition, { ADD_ATTR: ['target'] })
                    }}
                  />
                ))}
              </div>
            )}
          </Transition>
        </div>
      </LeftRightLayout.Left>
      <LeftRightLayout.Right>
        <img
          class="max-w-[30rem] w-full hidden md:block"
          src={props.step.content.imageUrl}
          loading="lazy"
        />
      </LeftRightLayout.Right>
    </LeftRightLayout>
  );
};

export default EoiTemplate;

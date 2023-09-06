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

interface SimpleTemplateData {
  content: {
    imageUrl: string;
    mobileImageUrl: string;
    title: string;
    description: string;
    details?: string[];
    terms?: string[];
  };
}

interface Props {
  stepNumber: {
    current: number;
    total: number;
  };
  step: SimpleTemplateData | MarketplaceOffer;
  primaryButton: { text?: string; class?: string; onClick: () => void };
}

const SimpleTemplate: FunctionalComponent<Props> = (props) => {
  useEffect(() => {
    (async (): Promise<void> => {
      if ('name' in props.step) {
        await BackendApi.command({
          offerName: props.step.name!,
          eventType: 'OfferViewed',
          data: {
            ...props.step.metadata!
          }
        });
      }
    })();
  }, [props.step]);

  const handleButtonClick = async (): Promise<void> => {
    if ('name' in props.step) {
      await BackendApi.command({
        offerName: props.step.name,
        eventType: 'OfferProgressed',
        data: {
          ...props.step.metadata!,
          template: 'Simple'
        }
      });
    }
    props.primaryButton.onClick();
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
            class="-translate-y-6"
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
              <Button class={props.primaryButton.class ?? ''} onClickPromise={handleButtonClick}>
                {props.primaryButton.text ?? 'Next'}
              </Button>
            </div>
            {props.step.content.terms && (
              <div class="flex flex-col gap-3 mt-6 text-gray-600 text-xs ">
                {props.step.content.terms.map((termsAndCondition, i) => (
                  <span
                    key={i}
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

export default SimpleTemplate;

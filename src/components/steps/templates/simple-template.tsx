import { FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import DOMPurify from 'dompurify';

import Button from '../../button';
import LearnMore from '../../learn-more';
import { Transition } from '@headlessui/react';
import LearnMorePanel from '../../learn-more-panel';
import { BackendApi, Step, EventType } from '../../../services/backend-api';

interface Props {
  stepNumber: {
    current: number;
    total: number;
  };
  step?: Step;
  image: {
    mobileSrc: string;
    desktopSrc: string;
  };
  title: string;
  info: string;
  learnMoreText?: string[];
  termsAndConditions?: string[];
  primaryButton: { text?: string; class?: string; onClick: () => void };
}

const SimpleTemplate: FunctionalComponent<Props> = (props) => {
  useEffect(() => {
    if (props.step) {
      (async (): Promise<void> => {
        const eventName = ('Start' + props.step) as EventType;
        await BackendApi.command({ name: eventName });
      })();
    }
  }, [props.step]);

  const handleButtonClick = async (): Promise<void> => {
    if (props.step) {
      await BackendApi.stepProgressCommand(props.step, false);
    }
    props.primaryButton.onClick();
  };

  return (
    <Transition
      appear={true}
      show={true}
      enter="transition duration-700 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      class="opacity-0"
    >
      <div class="md:grid md:grid-cols-2 max-w-[59.5rem] mx-auto">
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
              src={props.image.mobileSrc}
              loading="lazy"
            />
            <div class="md:max-w-[27.5rem]">
              <h3 class="mt-8 md:mt-3 text-2xl md:text-3xl leading-8 md:leading-9 font-bold">
                {props.title}
              </h3>
              <p class="mt-2 text-base md:text-lg leading-6 md:leading-7 text-gray-600 break-words">
                {props.info}
              </p>
              {props.learnMoreText && (
                <div class="mt-6 hidden md:block">
                  <LearnMorePanel items={props.learnMoreText} />
                </div>
              )}
            </div>
            {props.learnMoreText && (
              <LearnMore class="mt-6 md:hidden" items={props.learnMoreText} />
            )}
            {props.children && props.children}
            <div class="flex flex-col md:flex-row md:justify-between gap-4 md:max-w-[27.5rem] mt-6 md:mt-11">
              <Button class={props.primaryButton.class ?? ''} onClickPromise={handleButtonClick}>
                {props.primaryButton.text ?? 'Next'}
              </Button>
            </div>
            {props.termsAndConditions && (
              <div class="flex flex-col gap-3 mt-6 text-gray-600 text-xs ">
                {props.termsAndConditions.map((termsAndCondition, i) => (
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
        <Transition
          appear={true}
          show={true}
          enter="transition delay-300 duration-[600ms] ease-out"
          enterFrom="opacity-0 -translate-y-6"
          enterTo="opacity-100 translate-y-0"
          class="opacity-0 -translate-y-6"
        >
          <img
            class="max-w-[30rem] w-full hidden md:block"
            src={props.image.desktopSrc}
            loading="lazy"
          />
        </Transition>
      </div>
    </Transition>
  );
};

export default SimpleTemplate;

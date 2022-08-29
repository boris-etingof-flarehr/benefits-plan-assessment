import { FunctionalComponent } from 'preact';
import Button from '../button';
import LearnMore from '../learn-more';
import { Transition } from '@headlessui/react';
import LearnMorePanel from '../learn-more-panel';

interface Props {
  header: {
    title: string;
    step: {
      current: number;
      total: number;
    };
  };
  image: {
    mobileSrc: string;
    desktopSrc: string;
  };
  title: string;
  info: string;
  learnMoreText?: string[];
  button: { text?: string; class?: string; onClick: () => Promise<void> };
}

const StepTemplate: FunctionalComponent<Props> = (props) => {
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
            <span class="text-gray-400 my-auto md:mr-3 font-medium">{props.header.title}</span>
            <span class="relative px-3 py-0.5 text-primary-base font-semibold">
              STEP {props.header.step.current}/{props.header.step.total}
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
            <Button
              class={props.button.class ?? 'mt-6 md:mt-[5.75rem]'}
              onClickPromise={props.button.onClick}
            >
              {props.button.text ?? 'Next'}
            </Button>
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

export default StepTemplate;

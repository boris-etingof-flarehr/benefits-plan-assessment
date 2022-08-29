import { FunctionalComponent } from 'preact';
import Button from '../button';
import introDesktopImg from '../../assets/desktop/intro.jpg';
import { Transition } from '@headlessui/react';
import { BackendApi } from '../../services/backend-api';

interface Props {
  employerName: string;
  onStepComplete: () => void;
}

const Intro: FunctionalComponent<Props> = (props) => {
  return (
    <Transition
      appear={true}
      show={true}
      enter="transition duration-[400ms] ease-out"
      enterFrom="opacity-0 -translate-y-6"
      enterTo="opacity-100 translate-y-0"
      class="opacity-0 -translate-y-6"
    >
      <div class="mt-20 md:mt-0 text-center max-w-[40rem] mx-auto">
        <img class="w-full" src={introDesktopImg} />
        <h3 class="mt-8 text-2xl md:text-3xl leading-8 md:leading-9 font-bold">
          Introducing your workplace benefits
        </h3>
        <p class="mt-3 text-lg leading-7 text-gray-600">
          It's time you got more out of your pay with {props.employerName} and Flare benefits
        </p>
        <Button
          class="mt-8"
          onClickPromise={async (): Promise<void> => {
            await BackendApi.command({ name: 'Start' });
            props.onStepComplete();
          }}
        >
          Get started
        </Button>
      </div>
    </Transition>
  );
};

export default Intro;

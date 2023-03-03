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
      <div class="mt-20 md:mt-0 flex flex-col text-center items-center max-w-[40rem] mx-auto">
        <img class="max-w-[15rem] w-full" src={introDesktopImg} />
        <h3 class="mt-8 text-2xl md:text-3xl leading-8 md:leading-9 font-bold">
          Unlock thousands in savings with exclusive workplace benefits
        </h3>
        <p class="mt-3 text-lg leading-7 text-gray-600">
          You’ve got access to a range of exclusive benefits that can help you save thousands of dollars every year. You could save on your car, private health insurance, weekly grocery shop and more. 
        </p>
        <Button
          class="mt-8"
          onClickPromise={async (): Promise<void> => {
            await BackendApi.command({ name: 'Start' });
            props.onStepComplete();
          }}
        >
          View exclusive offers
        </Button>
      </div>
    </Transition>
  );
};

export default Intro;

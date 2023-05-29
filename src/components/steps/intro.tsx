import { FunctionalComponent } from 'preact';
import { Transition } from '@headlessui/react';

import Button from '../button';
import introDesktopImg from '../../assets/desktop/intro.jpg';
import { BackendApi } from '../../services/backend-api';
import { useEffect, useState } from 'preact/hooks';

interface Props {
  employerName: string;
  onStepComplete: () => void;
}

const Intro: FunctionalComponent<Props> = (props) => {
  const [membership, setMembership] = useState(true);

  useEffect(() => {
    (async (): Promise<void> => {
      await BackendApi.command({
        eventType: 'OfferViewed',
        offerName: 'Membership',
        data:{
          featureName:"",
          treatmentName:""
        }
      });
    })();
  }, []);

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
          Finish setting up your workplace benefits
        </h3>
        <p class="mt-3 text-lg leading-7 text-gray-600">
          Because your workplace uses Flare you have access to a range of exclusive benefits that
          can save you thousands of dollars every year on your car, private health insurance, weekly
          grocery shop and more.
        </p>
        <div class="flex items-center text-left mt-6">
          <input
            class="accent-primary-base h-4 w-4"
            type="checkbox"
            name="membership"
            checked={membership}
            onChange={(e): void => setMembership((e.target as any)?.checked)}
          />
          <label
            class="font-medium text-sm text-gray-900 ml-3"
            for="membership"
          >
            <span>
              I would like to be contacted about the latest benefits from Flare and agree to the{' '}
              <a href="https://www.flarehr.com/privacy-policy/" target="_blank" rel="noreferrer">
                privacy policy
              </a>
              .
            </span>
          </label>
        </div>
        <Button
          class="mt-8"
          onClickPromise={async (): Promise<void> => {
            await BackendApi.command({ eventType: 'Started' });
            await BackendApi.command({ eventType: 'OfferProgressed',
            offerName:"Membership",
            data: { 
              accepted: membership,
              featureName:"",
              treatmentName:"",
              template:"Eoi"
            } });
            props.onStepComplete();
          }}
        >
          Set up your benefits
        </Button>
      </div>
    </Transition>
  );
};

export default Intro;

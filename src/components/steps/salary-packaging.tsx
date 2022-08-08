import { FunctionalComponent } from 'preact';
import desktopImg from '../../assets/desktop/salary-packaging.jpg';
import mobileImg from '../../assets/mobile/salary-packaging-mobile.jpg';
import { Switch } from '@headlessui/react';
import { useState } from 'preact/hooks';
import StepTemplate from './step-template';
import { BackendApi } from '../../services/backend-api';

interface Props {
  step: { current: number; total: number };
  onStepComplete: () => void;
}

const SalaryPackaging: FunctionalComponent<Props> = (props) => {
  const [isInterested, setIsInterested] = useState(true);

  return (
    <StepTemplate
      header={{ title: 'NOVATED CAR LEASING', step: props.step }}
      image={{ mobileSrc: mobileImg, desktopSrc: desktopImg }}
      title="Save on tax with salary packaging"
      info="Save thousands of dollars a year with a Flare novated lease, one of the most effective ways to maximise your take home pay."
      learnMoreText={['Tax Savings using pretax income', 'GST Savings', 'Set and forget budgeting']}
      button={{
        class: 'mt-6 md:mt-11',
        onClick: async (): Promise<void> => {
          await BackendApi.command({ name: 'ProgressSalaryPackaging', accepted: isInterested });
          props.onStepComplete();
        }
      }}
    >
      <Switch.Group>
        <div class="mt-6 flex">
          <Switch
            checked={isInterested}
            onChange={setIsInterested}
            class={`${isInterested ? 'bg-primary-base' : 'bg-gray-200'}
          inline-flex h-[1.5rem] w-[2.75rem] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 my-auto`}
          >
            <span
              class={`${isInterested ? 'translate-x-[1.25rem]' : 'translate-x-0'}
            pointer-events-none inline-block h-[1.25rem] w-[1.25rem] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
          <Switch.Label>
            <div class="font-medium text-sm leading-5 text-gray-900 cursor-pointer ml-3">
              I’m interested, please contact me with more information.
            </div>
          </Switch.Label>
        </div>
      </Switch.Group>
    </StepTemplate>
  );
};

export default SalaryPackaging;

import { Transition } from '@headlessui/react';
import { FunctionalComponent } from 'preact';
import CheckIcon from '../assets/icons/check.svg';

interface Props {
  items: string[];
}

const LearnMorePanel: FunctionalComponent<Props> = (props) => {
  return (
    <Transition
      appear={true}
      show={true}
      enter="transition duration-300 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      class="opacity-0"
    >
      <div class="w-full border border-gray-200 rounded-lg shadow-sm p-4 md:p-6 space-y-2">
        {props.items.map((item, index) => (
          <div class="flex space-x-1" key={index}>
            <span>
              <CheckIcon class="h-5 w-5 fill-primary-base" />
            </span>
            <span class="text-sm leading-5 text-gray-600">{item}</span>
          </div>
        ))}
      </div>
    </Transition>
  );
};

export default LearnMorePanel;

import { FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';

import ChevronDownIcon from '../../assets/icons/chevron-down.svg';
import LearnMorePanel from './learn-more-panel';

interface Props {
  class: string;
  items: string[];
}

const LearnMore: FunctionalComponent<Props> = (props) => {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div class={props.class}>
      {!showPanel ? (
        <button
          type="button"
          class="w-full inline-flex justify-center items-center px-4 py-3 border border-gray-200 shadow-sm text-sm font-medium rounded-md text-primary-base bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus"
          onClick={(): void => setShowPanel(true)}
        >
          Learn more
          <span class="ml-1">
            <ChevronDownIcon class="h-4 w-4" />
          </span>
        </button>
      ) : (
        <LearnMorePanel items={props.items} />
      )}
    </div>
  );
};

export default LearnMore;

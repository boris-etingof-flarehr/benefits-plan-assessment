import { FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';

import Loader from './loader';

interface Props {
  class: string;
  disabled?: boolean;
  onClickPromise?: () => Promise<void>;
}

const Button: FunctionalComponent<Props> = (props) => {
  const [isExecutingPromise, setIsExecutingPromise] = useState(false);

  return (
    <button
      type="button"
      class={`${props.class} inline-flex items-center justify-center px-10 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white disabled:text-gray-300 bg-primary-base hover:bg-primary-hover disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus w-full md:w-auto`}
      disabled={props.disabled}
      onClick={async (): Promise<void> => {
        if (props.onClickPromise && !isExecutingPromise) {
          setIsExecutingPromise(true);
          try {
            await props.onClickPromise();
          } catch (error) {}
          setIsExecutingPromise(false);
        }
      }}
    >
      <div class={`${isExecutingPromise ? 'invisible' : ''}`}>{props.children}</div>
      {isExecutingPromise && (
        <div class="absolute animate-spin">
          <Loader theme="light" />
        </div>
      )}
    </button>
  );
};

export default Button;

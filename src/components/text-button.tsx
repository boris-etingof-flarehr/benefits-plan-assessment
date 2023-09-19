import { ComponentProps, FunctionalComponent } from 'preact';
import { useCallback, useState } from 'preact/hooks';

import Loader from './loader';

type Props = Omit<ComponentProps<'button'>, 'onClick'> & {
  onClick: () => Promise<void>;
};

const TextButton: FunctionalComponent<Props> = ({ className, onClick, ...props }) => {
  const [loading, setLoading] = useState(false);

  const handleOnClick = useCallback(() => {
    if (!loading) {
      setLoading(true);
      return onClick().finally(() => {
        setLoading(false);
      });
    }
  }, [loading, onClick]);

  return (
    <button
      className={`inline-flex items-center justify-center px-2 text-primary-base rounded-md bg-transparent hover:bg-sky-50/50 focus:ring-2 focus:ring-primary-focus ${
        className ?? ''
      }`}
      onClick={handleOnClick}
      {...props}
    >
      <div class={`relative ${loading ? 'invisible' : ''}`}>{props.children}</div>
      {loading && (
        <div class="absolute animate-spin">
          <Loader theme="primary" />
        </div>
      )}
    </button>
  );
};

export default TextButton;

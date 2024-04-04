import { ComponentProps, FunctionalComponent, JSX } from 'preact';
import { useCallback } from 'preact/hooks';

type Props = Omit<ComponentProps<'input'>, 'onChange' | 'value'> & {
  allowedKeyPattern: RegExp;
  value?: string;
  iconElement: JSX.Element | false;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
};

const TextField: FunctionalComponent<Props> = ({
  className,
  label,
  allowedKeyPattern,
  onChange,
  value,
  iconElement,
  ...props
}) => {
  const handleOnKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!allowedKeyPattern.test(e.key)) {
        e.preventDefault();
      }
    },
    [allowedKeyPattern]
  );

  return (
    <>
      <label class="font-medium text-sm text-gray-900 text-left">
        <span>{label}</span>
      </label>
      <div class="relative">
        <input
          type="text"
          className={`p-2 border-0 ring-2 ring-gray-200 focus:outline-none focus-visible:ring-gray-500 text-base font-medium rounded-md shadow-sm w-full ${className}`}
          value={value}
          onKeyPress={handleOnKeyPress}
          onChange={(ev): void => onChange(ev.currentTarget.value)}
          {...props}
        />
        {iconElement}
      </div>
    </>
  );
};

export default TextField;

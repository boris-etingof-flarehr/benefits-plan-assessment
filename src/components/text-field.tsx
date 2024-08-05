import { ComponentProps, FunctionalComponent, JSX } from 'preact';
import { useCallback } from 'preact/hooks';

type Props = Omit<ComponentProps<'input'>, 'onChange' | 'value'> & {
  allowedKeyPattern?: RegExp;
  value?: string;
  leadingIconElement?: JSX.Element;
  trailingIconElement: JSX.Element | false;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
};

const TextField: FunctionalComponent<Props> = ({
  className,
  allowedKeyPattern,
  onChange,
  value,
  leadingIconElement,
  trailingIconElement,
  ...props
}) => {
  const handleOnKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (allowedKeyPattern && !allowedKeyPattern.test(e.key)) {
        e.preventDefault();
      }
    },
    [allowedKeyPattern]
  );

  return (
    <>
      <div class="relative">
        {leadingIconElement}
        <input
          type="text"
          className={`border-0 ring-2 ring-gray-200 focus:outline-none text-base font-medium rounded-md shadow-sm ${className}`}
          value={value}
          onKeyPress={handleOnKeyPress}
          onChange={(ev): void => onChange(ev.currentTarget.value)}
          {...props}
        />
        {trailingIconElement}
      </div>
    </>
  );
};

export default TextField;

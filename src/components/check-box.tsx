import { ComponentProps, FunctionalComponent } from 'preact';
import React from 'preact/compat';

type Props = Omit<ComponentProps<'input'>, 'value' | 'onChange'> & {
  value: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: boolean) => void;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const CheckBox = ({ value, onChange, className, children, ...props }: Props) => {
  const childrenComponents = React.Children.toArray(children);
  const labelComponent = childrenComponents.find((o) => o.type === Label);
  const id = crypto.randomUUID ? crypto.randomUUID(): crypto.getRandomValues(new Uint32Array(5)).join('-');

  return (
    <div className={`flex items-center text-left ${className ?? ''}`}>
      <input
        id={id}
        class="accent-primary-base h-4 w-4"
        type="checkbox"
        checked={value}
        onChange={(e): void => onChange(e.currentTarget.checked)}
        {...props}
      />
      {labelComponent && (
        <label for={id} className={`font-medium text-sm text-gray-900 ml-3 }`}>
          {labelComponent}
        </label>
      )}
    </div>
  );
};

const Label: FunctionalComponent = ({ children }) => <>{children}</>;

CheckBox.Label = Label;

export default CheckBox;

import { FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';

type Option = {
  label: string;
  value: string;
};

type Props = {
  value?: Option;
  options: ReadonlyArray<Option>;
  onChange: (_selected: Option) => void;
  className?: string;
};

const crypto = window.crypto;

const ToggleButton: FunctionalComponent<Props> = ({ value, options, onChange, className }) => {
  if (options.length !== 2) {
    throw "ToggleButton can only be used when there're only 2 options.";
  }

  const radioGroupId = crypto.randomUUID();
  const radioAId = crypto.randomUUID();
  const optionA = options[0];
  const radioIdBId = crypto.randomUUID();
  const optionB = options[1];

  const isNoneCheckedByDefault = !value;

  const handleOnChange = (isOptionAChecked: boolean): void => {
    onChange(isOptionAChecked ? optionA : optionB);
  };

  useEffect(() => {
    if (isNoneCheckedByDefault) {
      handleOnChange(true);
    }
  }, []);

  return (
    <div className={`bg-gray-200 rounded-md w-fit h-fit p-0.5 ${className ?? ''}`}>
      <div className="relative flex gap-2">
        <input
          className="hidden [:checked&~.glider]:translate-x-0"
          type="radio"
          id={radioAId}
          name={radioGroupId}
          checked={isNoneCheckedByDefault || value === optionA}
          onChange={(ev): void => handleOnChange((ev.target as HTMLInputElement)?.checked)}
        />
        <label
          className="z-10 cursor-pointer rounded-md px-8 py-1 max-w-40 text-sm font-medium truncate"
          for={radioAId}
        >
          {optionA.label}
        </label>
        <input
          className="hidden [:checked&~.glider]:translate-x-full"
          type="radio"
          id={radioIdBId}
          name={radioGroupId}
          checked={value === optionB}
          onChange={(ev): void => handleOnChange(!(ev.target as HTMLInputElement)?.checked)}
        />
        <label
          className="z-10 cursor-pointer rounded-md px-8 py-1 max-w-40 text-sm font-medium"
          for={radioIdBId}
        >
          {optionB.label}
        </label>
        <span className="glider z-11 absolute bg-white rounded-md transition-transform ease-out duration-200 h-7 w-1/2" />
      </div>
    </div>
  );
};

export default ToggleButton;

import { JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';

type Option<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  name: string;
  defaultValue?: Option<T>;
  options: [Option<T>, Option<T>];
  onChange: (_selected: { [key: string]: T }) => void;
  className?: string;
};

const ToggleButton = <T,>({
  name,
  defaultValue,
  options,
  onChange,
  className
}: Props<T>): JSX.Element => {
  const optionA = options[0];
  const optionB = options[1];

  const [selected, setSelected] = useState(defaultValue ? defaultValue : optionA);

  useEffect(() => {
    onChange({ [name]: selected.value });
  }, [name, onChange, selected.value]);

  return (
    <div className={`bg-gray-200 rounded-md w-fit h-fit p-0.5 ${className ?? ''}`}>
      <div className="relative flex gap-2">
        <label className="z-10 cursor-pointer rounded-md px-8 py-1 max-w-40 text-sm font-medium truncate">
          <input
            className="hidden"
            type="radio"
            name={name}
            checked={defaultValue === optionA}
            onChange={(ev): void =>
              setSelected((ev.target as HTMLInputElement)?.checked ? optionA : optionB)
            }
          />
          {optionA.label}
        </label>

        <label className="z-10 cursor-pointer rounded-md px-8 py-1 max-w-40 text-sm font-medium truncate">
          <input
            className="hidden"
            type="radio"
            name={name}
            checked={defaultValue === optionB}
            onChange={(ev): void =>
              setSelected((ev.target as HTMLInputElement)?.checked ? optionB : optionA)
            }
          />
          {optionB.label}
        </label>
        <span
          className={`z-11 absolute bg-white rounded-md transition-transform ease-out duration-200 h-7 w-1/2 ${selected === optionA ? 'translate-x-0' : 'translate-x-full'}`}
        />
      </div>
    </div>
  );
};

export default ToggleButton;

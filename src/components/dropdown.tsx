import { Listbox, Transition } from '@headlessui/react';
import { Fragment, JSX } from 'preact/compat';

import ChevronDownIcon from '../assets/icons/chevron-down.svg';

type Option<T> = { label: string; value: T };

type Props<T> = {
  name: string;
  defaultValue?: Option<T>;
  options: ReadonlyArray<Option<T>>;
  className?: string;
  onChange: (_selected: { [key: string]: T }) => void;
};

const Dropdown = <T,>({
  name,
  defaultValue,
  options,
  onChange,
  className
}: Props<T>): JSX.Element => {
  return (
    <Listbox
      name={name}
      defaultValue={defaultValue}
      onChange={(option) => onChange({ [name]: option.value })}
      className={`w-fit min-w-60 ${className ?? ''}`}
    >
      <div className="relative">
        <Listbox.Button className="relative w-full h-9 cursor-default rounded-md border-2 bg-white py-0.5 pl-3 pr-10 text-left focus:outline-none focus-visible:border-gray-700">
          {({ value: selected }: { value: Option<T> }): JSX.Element => (
            <>
              <span className="block truncate">{selected?.label ?? 'Select'}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon className="h-5 w-5 text-gray-700" aria-hidden="true" />
              </span>
            </>
          )}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 flex flex-col gap-0.5 mt-1 max-h-60 w-full overflow-auto rounded-md border-2 bg-white py-1 text-base ring-none focus:outline-none focus-visible:border-gray-700">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                className={({ active, selected }): string =>
                  `relative h-7 cursor-default select-none py-0.5 pl-3 pr-4 ${
                    active || selected ? 'font-medium text-white' : 'text-gray-700'
                  } ${active ? 'bg-primary-hover' : selected ? 'bg-primary-base' : ''}`
                }
                value={option}
              >
                {({ selected }: { selected: boolean }): JSX.Element => (
                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                    {option.label}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Dropdown;

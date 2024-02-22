import { Switch } from '@headlessui/react';
import { FunctionalComponent } from 'preact';
import { useCallback, useState } from 'preact/hooks';

type Props = {
  value: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (checked: boolean) => void;
  label: string;
  className: string;
};

const ToggleSwitch: FunctionalComponent<Props> = (props) => {
  const [checked, setChecked] = useState(props.value);

  const handleOnChange = useCallback(
    (toggledOn: boolean) => {
      setChecked(toggledOn);
      props.onChange(toggledOn);
    },
    [props]
  );

  return (
    <Switch.Group>
      <div className={`${props.className} flex items-center`}>
        <Switch
          checked={checked}
          onChange={handleOnChange}
          class={`${checked ? 'bg-primary-base' : 'bg-gray-200'}
      inline-flex h-[1.5rem] w-[2.75rem] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 my-auto`}
        >
          <span
            class={`${checked ? 'translate-x-[1.25rem]' : 'translate-x-0'}
        pointer-events-none inline-block h-[1.25rem] w-[1.25rem] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        <Switch.Label>
          <div class="font-medium text-sm leading-5 text-gray-900 cursor-pointer ml-3">
            {props.label}
          </div>
        </Switch.Label>
      </div>
    </Switch.Group>
  );
};

export default ToggleSwitch;

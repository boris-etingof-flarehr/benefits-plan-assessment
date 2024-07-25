import Dropdown from '@app/components/dropdown';
import ToggleButton from '@app/components/toggle-button';
import FormLabel from '@app/components/typography/form-label';
import { FC } from 'preact/compat';

import type { Option, QuestionAnswer, SingleSelectQuestion } from '../models';

type Props = SingleSelectQuestion & {
  onChange: (_answer: QuestionAnswer) => void;
};

const SingleSelectStep: FC<Props> = ({ id, title, defaultValue, options, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <FormLabel>{title}</FormLabel>

      {options.length === 2 ? (
        <ToggleButton
          name={id}
          defaultValue={options.find(({ value }) => value === defaultValue)}
          options={options as [Option, Option]}
          onChange={onChange}
        />
      ) : (
        <Dropdown
          name={id}
          defaultValue={options.find(({ value }) => value === defaultValue)}
          options={options}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default SingleSelectStep;

import FormLabel from '@app/components/typography/form-label.tsx';
import { FC, useEffect, useState } from 'preact/compat';

import type { QuestionAnswer, TextQuestion } from '../models.ts';

type Props = TextQuestion & {
  onChange: (value: QuestionAnswer) => void;
};

const TextStep: FC<Props> = ({ onChange, ...step }) => {
  const [value, setValue] = useState(step.defaultValue);
  const [error, setError] = useState<string>();

  useEffect(() => {
    value && !RegExp(step.matchExpression).test(value)
      ? setError(step.invalidMessage)
      : setError(undefined);
    onChange({ [step.id]: value });
  }, [step, onChange, value]);

  return (
    <div className="flex flex-col gap-2">
      <FormLabel>{step.title}</FormLabel>

      <input
        type="text"
        className={`${blurredStyle} ${focusedStyle} ${error ? invalidStyle : '' }`}
        value={value}
        onChange={({ currentTarget: { value } }): void => setValue(value)}
      />

      {error && <span className="text-xs text-rose-500">{error}</span>}
    </div>
  );
};

const blurredStyle = 'self-start px-3 py-1 rounded-md shadow-sm ring-2 ring-gray-200';
const focusedStyle = 'focus:outline-none focus-visible:ring-gray-700';
const invalidStyle = 'text-red-900 ring-red-300 focus-visible:ring-red-600';

export default TextStep;

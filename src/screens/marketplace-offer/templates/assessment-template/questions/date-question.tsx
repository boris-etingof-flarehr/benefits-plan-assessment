import FormLabel from '@app/components/typography/form-label.tsx';
import { FC, useEffect, useState } from 'preact/compat';

import { type DateQuestion, DateQuestionInvalidDays, type QuestionAnswer } from '../models.ts';

type Props = DateQuestion & {
  onChange: (value: QuestionAnswer) => void;
};

const validate = (value: string, step: DateQuestion): string | undefined => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);

  const excludeWeekends = step.invalidDays?.includes(DateQuestionInvalidDays.Weekends);
  const dayOfWeek = date.getDay();
  if (excludeWeekends && (dayOfWeek === 0 || dayOfWeek === 6)) {
    // 0 is Sunday, 6 is Saturday
    return step.invalidMessage;
  }

  let maxDate: Date | undefined;
  if (step.maximumValue) {
    maxDate = new Date(step.maximumValue);
    maxDate.setHours(0, 0, 0, 0);
    if (date > maxDate) {
      return step.invalidMessage;
    }
  }

  let minDate: Date | undefined;
  if (step.minimumValue) {
    if (step.minimumValue.toLowerCase() === 'today') {
      minDate = new Date();
      minDate.setDate(minDate.getDate() + (step.minimumValueAddDays || 0));
      minDate.setHours(0, 0, 0, 0);
    } else {
      minDate = new Date(step.minimumValue);
      minDate.setHours(0, 0, 0, 0);
    }
    if (date < minDate) {
      return step.invalidMessage;
    }
  }
};

const DateStep: FC<Props> = ({ onChange, ...step }) => {
  const [value, setValue] = useState(step.defaultValue);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const invalidMessage = value ? validate(value, step) : undefined;

    invalidMessage ? setError(invalidMessage) : setError(undefined);

    onChange({ [step.id]: value });
  }, [step, onChange, value]);

  return (
    <div className="flex flex-col gap-2">
      <FormLabel>{step.title}</FormLabel>

      <input
        type="date"
        className={`self-start px-3 py-1 ring-2 ring-gray-200 focus:outline-none focus-visible:border-gray-700 rounded-md shadow-sm ${error ? 'text-red-900 ring-red-300' : ''}`}
        value={value}
        onChange={({ currentTarget: { value } }): void => setValue(value)}
      />

      {error && <span className="text-xs text-rose-500">{error}</span>}
    </div>
  );
};

export default DateStep;

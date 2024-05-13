import { FC, useCallback, useState } from 'preact/compat';

import TextField from '../../../../../components/text-field.tsx';
import FormLabel from '../../../../../components/typography/form-label.tsx';
import type { CurrencyQuestion, QuestionAnswer } from '../models.ts';

type Props = CurrencyQuestion & {
  onChange: (_answer: QuestionAnswer) => void;
};

const CurrencyStep: FC<Props> = ({ id, title, minimumValue, maximumValue, onChange }) => {
  const [error, setError] = useState('');
  const [isValidAnswer, setIsValidAnswer] = useState(false);

  const isValidAnswerRange = useCallback(
    (currencyAnswer: string) => {
      const currencyAnswerInNumber = Number(currencyAnswer);
      const isValid =
        currencyAnswerInNumber >= minimumValue && currencyAnswerInNumber <= maximumValue;
      setIsValidAnswer(isValid);
      return isValid;
    },
    [maximumValue, minimumValue]
  );

  const handleChange = (value: string): void => {
    const answer = isValidAnswerRange(value) ? value : '';
    onChange({ [id]: answer });
  };

  const handleFocusIn = useCallback(() => {
    setError('');
  }, []);

  const handleFocusOut = useCallback(() => {
    if (!isValidAnswer) {
      setError(`Please enter value between $${minimumValue} and $${maximumValue}`);
    }
  }, [isValidAnswer, minimumValue, maximumValue]);

  const leadingIconElement = (
    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <span>$</span>
    </div>
  );

  const getClassName = (): string => {
    if (error.length !== 0) {
      return 'h-8 pl-7 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-red-500';
    }
    return 'h-8 pl-7';
  };

  return (
    <div className="flex flex-col gap-1">
      <FormLabel>{title}</FormLabel>
      <TextField
        allowedKeyPattern={/[0-9]/}
        inputMode="numeric"
        className={getClassName()}
        onfocusin={handleFocusIn}
        onfocusout={handleFocusOut}
        leadingIconElement={leadingIconElement}
        trailingIconElement={false}
        onChange={handleChange}
      />

      {error.length !== 0 && (
        <div className="leading-none">
          <span className="text-xs text-rose-500">{error}</span>
        </div>
      )}
    </div>
  );
};

export default CurrencyStep;

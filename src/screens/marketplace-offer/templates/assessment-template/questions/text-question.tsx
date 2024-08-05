import { FC, useCallback, useState } from 'preact/compat';

import TextField from '../../../../../components/text-field.tsx';
import FormLabel from '../../../../../components/typography/form-label.tsx';
import type { QuestionAnswer, TextQuestion } from '../models.ts';

type Props = TextQuestion & {
  onChange: (_answer: QuestionAnswer) => void;
};

const TextStep: FC<Props> = ({
  id,
  title,
  matchExpression,
  invalidMessage,
  defaultValue,
  onChange
}) => {
  const [error, setError] = useState('');
  const [isValidAnswer, setIsValidAnswer] = useState(false);

  const isValidAnswerRange = useCallback(
    (answer: string) => {
      const isValid = RegExp(matchExpression).test(answer);
      setIsValidAnswer(isValid);
      return isValid;
    },
    [matchExpression]
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
      setError(invalidMessage);
    }
  }, [isValidAnswer, invalidMessage]);

  const getClassName = (): string => {
    if (error.length !== 0) {
      return 'h-8 pl-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-red-500';
    }
    return 'h-8 pl-3';
  };

  return (
    <div className="flex flex-col gap-1">
      <FormLabel>{title}</FormLabel>

      <TextField
        value={defaultValue}
        className={getClassName()}
        onfocusin={handleFocusIn}
        onfocusout={handleFocusOut}
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

export default TextStep;

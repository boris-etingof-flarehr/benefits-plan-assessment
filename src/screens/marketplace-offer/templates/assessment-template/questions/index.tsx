import { FC, useEffect } from 'preact/compat';

import type { AssessmentAnswers, Question, QuestionAnswer } from '../models';
import CurrencyStep from './currency-question';
import DateStep from './date-question';
import SingleSelectStep from './single-select-question';
import TextStep from './text-question';
import useQuestions from './use-questions';

const QuestionIndex: FC<Question & { onChange: (_answer: QuestionAnswer) => void }> = (
  question
) => {
  switch (question.template) {
    case 'SingleSelect':
      return <SingleSelectStep {...question} />;
    case 'Currency':
      return <CurrencyStep {...question} />;
    case 'Text':
      return <TextStep {...question} />;
    case 'Date':
      return <DateStep {...question} />;
    default:
      return <></>;
  }
};

type Props = {
  questions: ReadonlyArray<Question>;
  onChange: (_value: AssessmentAnswers) => void;
  className?: string;
};

const Questions: FC<Props> = ({ questions: initialQuestions, onChange, className }) => {

  const { questions, answerQuestion, answers } = useQuestions(initialQuestions);
  useEffect(() => onChange(answers), [answers, onChange]);

  return (
    <div className={`flex flex-col gap-4 ${className ?? ''}`}>
      {questions.map((question) => (
        <QuestionIndex key={question.id} {...question} onChange={answerQuestion} />
      ))}
    </div>
  );
};

export default Questions;

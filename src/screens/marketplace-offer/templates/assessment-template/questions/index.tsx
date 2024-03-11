import { FC, useEffect } from 'preact/compat';

import type { AssessmentAnswers, Question, QuestionAnswer } from '../models';
import useQuestions from '../use-questions';
import SingleSelectStep from './single-select-question';

const QuestionIndex: FC<
  Question & {
    onChange: (_answer: QuestionAnswer) => void;
  }
> = (question) => {
  switch (question.template) {
    case 'SingleSelect':
      return <SingleSelectStep {...question} />;
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

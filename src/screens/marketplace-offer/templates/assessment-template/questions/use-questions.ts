import equal from 'fast-deep-equal';
import { useCallback, useRef, useState } from 'preact/hooks';

import { AssessmentAnswers, Question, QuestionAnswer, QuestionId } from '../models';

type InternalQuestions = ReadonlyArray<Question & { selectedValue?: string }>;

const getInternalQuestions = (question: ReadonlyArray<Question>): InternalQuestions =>
  question.reduce((previous, current) => {
    let selectedValue;

    if (current.template === 'SingleSelect') {
      selectedValue = current.defaultValue;

      if (current.options.length === 2) {
        selectedValue = current.options[0].value;
      }
    }

    return [...previous, { ...current, selectedValue }];
  }, [] as InternalQuestions);

const getNextQuestionId = (
  currentQuestion: Question & { selectedValue?: string }
): QuestionId | undefined => {
  return (
    currentQuestion?.nextStepId ??
    ('options' in currentQuestion
      ? currentQuestion?.options.find((o) => o.value === currentQuestion.selectedValue)?.nextStepId
      : undefined) ??
    undefined
  );
};

export const getQuestionsInOrder = (questions: InternalQuestions): ReadonlyArray<Question> => {
  const result: Question[] = [];
  let nextStepId: string | undefined = questions[0].id;

  while (nextStepId) {
    const nextStep = questions.find((o) => o.id === nextStepId);
    if (nextStep) {
      result.push(nextStep);
      nextStepId = getNextQuestionId(nextStep);
    } else {
      nextStepId = undefined;
    }
  }

  return result;
};

const getAnswersFromQuestions = (questions: InternalQuestions): AssessmentAnswers =>
  questions.reduce(
    (previous, question) => ({ ...previous, [question.id]: question.selectedValue }),
    {} as AssessmentAnswers
  );

const applyAnswersToQuestions = (
  questions: InternalQuestions,
  answer: QuestionAnswer
): InternalQuestions =>
  questions.map((question) => {
    const answerValue = answer[question.id] ?? question.selectedValue;
    return {
      ...question,
      selectedValue: answerValue,
      defaultValue: answerValue
    };
  });

const useQuestions = (
  initialQuestions: ReadonlyArray<Question>
): {
  questions: ReadonlyArray<Question>;
  answerQuestion: (_answer: QuestionAnswer) => void;
  answers: AssessmentAnswers;
} => {
  const internalQuestions = useRef(getInternalQuestions(initialQuestions));

  const [questions, setQuestions] = useState<ReadonlyArray<Question>>(
    getQuestionsInOrder(internalQuestions.current)
  );

  const [answers, setAnswers] = useState<AssessmentAnswers>(
    getAnswersFromQuestions(internalQuestions.current)
  );

  const answerQuestion = useCallback((answer: QuestionAnswer) => {
    const updatedQuestions = applyAnswersToQuestions(internalQuestions.current, answer);

    if (equal(internalQuestions.current, updatedQuestions)) return;

    internalQuestions.current = updatedQuestions;
    const questionsInOrder = getQuestionsInOrder(updatedQuestions);
    setQuestions(questionsInOrder);
    setAnswers(getAnswersFromQuestions(questionsInOrder));
  }, []);

  return {
    questions,
    answerQuestion,
    answers
  };
};

export default useQuestions;

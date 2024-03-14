export type AssessmentId = string;
export type QuestionId = string;
export type StepTemplate = 'SingleSelect' | '';
export type QuestionValue = string;
export type QuestionAnswer = { [key: QuestionId]: QuestionValue | undefined };
export type AssessmentAnswers = { [key: QuestionId]: QuestionValue | undefined };

export type SingleSelectQuestion = {
  id: QuestionId;
  title: string;
  stepType: 'Question';
  description?: string;
  nextStepId?: QuestionId;
  defaultValue?: QuestionValue;
  template: 'SingleSelect';
  options: Option[];
};

export type Option = {
  label: string;
  value: string;
  nextStepId?: QuestionId;
};

export type Question = SingleSelectQuestion;

export type SubmissionResult = {
  imageUrl: string;
};

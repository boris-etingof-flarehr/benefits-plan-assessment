export type AssessmentId = string;
export type QuestionId = string;
export type StepTemplate = 'SingleSelect' | 'Currency';
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
  customerAttribute: string;
};

export type Option = {
  label: string;
  value: string;
  nextStepId?: QuestionId;
};

export type CurrencyQuestion = {
  customerAttribute: string;
  id: QuestionId;
  stepType: 'Question';
  invalidMessage: string;
  maximumValue: number;
  minimumValue: number;
  nextStepId: QuestionId;
  template: 'Currency';
  title: string;
};

export type Question = SingleSelectQuestion | CurrencyQuestion;

export type SubmissionResult = {
  imageUrl: string;
};

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

export type TextQuestion = {
  customerAttribute: string;
  id: QuestionId;
  stepType: 'Question';
  invalidMessage: string;
  nextStepId: QuestionId;
  template: 'Text';
  title: string;
  matchExpression: string;
  defaultValue: string;
};

export type DateQuestion = {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  progress: number;
  template: 'Date';
  defaultValue?: string;
  nextStepId: string;
  hint?: string;
  minimumValue?: string; // "today" or "2021-06-06"
  minimumValueAddDays?: number; // only present if minimumValue = 'today', can be negative
  maximumValue?: string;
  invalidMessage?: string;
  invalidDays?: DateQuestionInvalidDays[];
};

export enum DateQuestionInvalidDays {
  Weekends = 'Weekends',
  PublicHolidays = 'PublicHolidays',
}

export type Question = SingleSelectQuestion | CurrencyQuestion | TextQuestion | DateQuestion;

export type SubmissionResult = {
  imageUrl: string;
};

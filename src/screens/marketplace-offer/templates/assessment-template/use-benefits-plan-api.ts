import axios from 'axios';
import { useState } from 'preact/hooks';

import { AssessmentAnswers, Question } from './models';

type GetActivityStepsResponse = {
  firstStepId: string;
  steps: StepDto[];
};

type StepDto = {
  id: string;
  title: string;
  stepType: 'Consent' | 'Question' | 'Completion';
  description?: string;
  nextStepId?: string;
  template?: 'SingleSelect' | 'Currency';
  options?: OptionDto[];
  defaultValue?: string;
  customerAttribute?: string;
  invalidMessage?: string;
  maximumValue?: number;
  minimumValue?: number;
};

type OptionDto = {
  label: string;
  value: string;
  nextStepId?: string;
};

type GetCalculationResponse = {
  estimates: {
    primary: {
      title: string;
    };
    blurb: {
      text: string;
      imageUrl: string;
    };
  };
};

const getNextStepId = (
  steps: ReadonlyArray<StepDto>,
  currentStepId: string
): string | undefined => {
  const currentStep = steps.find((o) => o.id === currentStepId);

  return (
    currentStep?.nextStepId ??
    currentStep?.options?.find((o) => o.value === currentStep.defaultValue)?.nextStepId
  );
};

export const getQuestionsFromSteps = (
  firstStepId: string,
  steps: ReadonlyArray<StepDto>
): ReadonlyArray<Question> => {
  let firstQuestionStep: Question | undefined;
  let nextStepId: string | undefined = firstStepId;

  while (!firstQuestionStep) {
    const nextStep = steps.find((o) => o.id == nextStepId)!;

    if (nextStep.stepType === 'Question') {
      firstQuestionStep = nextStep as Question;
    }

    nextStepId = getNextStepId(steps, nextStep.id);
  }

  return [
    firstQuestionStep as Question,
    ...(steps.filter(
      (step) => step !== firstQuestionStep && step.stepType === 'Question'
    ) as Question[])
  ];
};

const useBenefitsPlanApi = (
  activityId: string
): {
  activity?: {
    steps: ReadonlyArray<StepDto>;
    firstStepId: string;
  };
  getActivity: () => Promise<void>;
  progressActivity: (_answers: AssessmentAnswers) => Promise<void>;
  calculation: GetCalculationResponse | undefined;
  getCalculation: () => Promise<void>;
} => {
  const [stepsResponse, setStepsResponse] = useState<GetActivityStepsResponse>();
  const [calculationResponse, setCalculationResponse] = useState<GetCalculationResponse>();

  const getActivity = (): Promise<void> =>
    axios.get<GetActivityStepsResponse>(`v2.0/activities/${activityId}/steps`).then((res) => {
      setStepsResponse(res.data);
    });

  const progressActivity = (answers: AssessmentAnswers): Promise<void> => {
    const data = {
      activityAction: 'ProgressStartToComplete',
      progressEvents: Object.entries(answers).map(([key, value]) => ({ stepId: key, value }))
    };

    return axios.put(`v1.0/customer/activities/${activityId}`, data);
  };

  const getCalculation = async (): Promise<void> =>
    axios
      .get<GetCalculationResponse>(`v1.0/activities/${activityId}/calculate`)
      .then((res) => setCalculationResponse(res.data));

  return {
    activity: stepsResponse,
    getActivity,
    progressActivity,
    calculation: calculationResponse,
    getCalculation
  };
};

export default useBenefitsPlanApi;

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
  template?: 'SingleSelect';
  options?: OptionDto[];
  defaultValue?: string;
};

type OptionDto = {
  label: string;
  value: string;
  nextStepId?: string;
};

type GetCalculationResponse = {
  title: string;
  description: string;
  imageUrl: string;
};

const mockHealthInsuranceSteps: GetActivityStepsResponse = {
  firstStepId: 'e8829359-9209-452a-9d87-5c014d770a9a',
  steps: [
    {
      id: '7aff3d2e-9ffc-4a78-bd00-5bcc7091288f',
      title: 'Health Estimate',
      stepType: 'Completion'
    },
    {
      id: '9b4926d4-a4b7-4db4-9b8f-c0ab1bc80d7d',
      title: 'What type of cover are you looking for?',
      stepType: 'Question',
      nextStepId: '14e13627-1540-4b23-a0cf-4c7205c98ac4',
      template: 'SingleSelect',
      options: [
        {
          label: 'Hospital + Extras',
          value: 'hospitalExtras',
          nextStepId: '14e13627-1540-4b23-a0cf-4c7205c98ac4'
        },
        {
          label: 'Hospital only',
          value: 'hospital',
          nextStepId: '14e13627-1540-4b23-a0cf-4c7205c98ac4'
        },
        {
          label: 'Extras only',
          value: 'extras',
          nextStepId: '14e13627-1540-4b23-a0cf-4c7205c98ac4'
        },
        {
          label: 'Not sure',
          value: 'notSure',
          nextStepId: '14e13627-1540-4b23-a0cf-4c7205c98ac4'
        }
      ]
    },
    {
      id: '413557e6-a5d8-49a6-b6fc-6de31ba3fc9d',
      title: 'Are you looking for health insurance to cover for:',
      stepType: 'Question',
      template: 'SingleSelect',
      options: [
        {
          label: 'Single (Yourself)',
          value: 'single',
          nextStepId: 'd2da8749-c8f0-4982-9aff-c234482dc549'
        },
        {
          label: 'Couple',
          value: 'couple',
          nextStepId: '466827d8-2fd9-4417-9d8e-ac5944d120b8'
        },
        {
          label: 'Family',
          value: 'family',
          nextStepId: '466827d8-2fd9-4417-9d8e-ac5944d120b8'
        },
        {
          label: 'Single parent family',
          value: 'singleParent',
          nextStepId: '466827d8-2fd9-4417-9d8e-ac5944d120b8'
        }
      ]
    },
    {
      id: '0c00f495-2021-4a17-b4b9-8a917fbb2e0f',
      title: 'Who is your current health insurance provider?',
      stepType: 'Question',
      nextStepId: '413557e6-a5d8-49a6-b6fc-6de31ba3fc9d',
      template: 'SingleSelect',
      options: [
        {
          label: 'AHM',
          value: 'ahm',
          nextStepId: '413557e6-a5d8-49a6-b6fc-6de31ba3fc9d'
        },
        {
          label: 'Australian Unity',
          value: 'australianUnity',
          nextStepId: '413557e6-a5d8-49a6-b6fc-6de31ba3fc9d'
        },
        {
          label: 'Bupa',
          value: 'bupa',
          nextStepId: '413557e6-a5d8-49a6-b6fc-6de31ba3fc9d'
        },
        {
          label: 'HBF',
          value: 'hbf',
          nextStepId: '413557e6-a5d8-49a6-b6fc-6de31ba3fc9d'
        },
        {
          label: 'HCF',
          value: 'hcf',
          nextStepId: '413557e6-a5d8-49a6-b6fc-6de31ba3fc9d'
        },
        {
          label: 'Medibank',
          value: 'medibank',
          nextStepId: '413557e6-a5d8-49a6-b6fc-6de31ba3fc9d'
        },
        {
          label: 'nib',
          value: 'nib',
          nextStepId: '413557e6-a5d8-49a6-b6fc-6de31ba3fc9d'
        },
        {
          label: 'Peoplecare',
          value: 'peoplecare',
          nextStepId: '413557e6-a5d8-49a6-b6fc-6de31ba3fc9d'
        },
        {
          label: 'Other not listed',
          value: 'other',
          nextStepId: '413557e6-a5d8-49a6-b6fc-6de31ba3fc9d'
        }
      ]
    },
    {
      id: '7f507eff-5b85-4bd3-879a-947741a12734',
      title: 'Do you currently have private health insurance?',
      stepType: 'Question',
      template: 'SingleSelect',
      options: [
        {
          label: 'Yes',
          value: 'yes',
          nextStepId: '0c00f495-2021-4a17-b4b9-8a917fbb2e0f'
        },
        {
          label: 'No',
          value: 'no',
          nextStepId: '413557e6-a5d8-49a6-b6fc-6de31ba3fc9d'
        }
      ]
    },
    {
      id: '12b7666c-f7f4-4961-a8e8-90eb619ef70f',
      title: 'Are you an Australian Permanent Resident and/or have a Medicare card?',
      stepType: 'Question',
      template: 'SingleSelect',
      options: [
        {
          label: 'Yes',
          value: 'australianResidentOrMedicare',
          nextStepId: '7f507eff-5b85-4bd3-879a-947741a12734'
        },
        {
          label: 'No',
          value: 'overseasVisitor',
          nextStepId: '472a7f69-3441-416a-81c2-0935dee47c8a'
        }
      ]
    },
    {
      id: '3d2fd1dc-d683-444b-a56e-58c76f8d31bf',
      title: 'What level of cover are you looking for?',
      stepType: 'Question',
      nextStepId: '52ab5245-e6df-4c23-9f5e-7e307747243e',
      template: 'SingleSelect',
      options: [
        {
          label: 'Basic',
          value: 'basic',
          nextStepId: '52ab5245-e6df-4c23-9f5e-7e307747243e'
        },
        {
          label: 'Medium',
          value: 'medium',
          nextStepId: '52ab5245-e6df-4c23-9f5e-7e307747243e'
        },
        {
          label: 'Top',
          value: 'top',
          nextStepId: '52ab5245-e6df-4c23-9f5e-7e307747243e'
        }
      ]
    },
    {
      id: '67d3ead5-359b-4f46-b446-dc84c778b9ea',
      title: 'Are you looking for health insurance to cover for:',
      stepType: 'Question',
      nextStepId: '3d2fd1dc-d683-444b-a56e-58c76f8d31bf',
      template: 'SingleSelect',
      options: [
        {
          label: 'Single (Yourself)',
          value: 'single',
          nextStepId: '3d2fd1dc-d683-444b-a56e-58c76f8d31bf'
        },
        {
          label: 'Couple',
          value: 'couple',
          nextStepId: '3d2fd1dc-d683-444b-a56e-58c76f8d31bf'
        },
        {
          label: 'Family',
          value: 'family',
          nextStepId: '3d2fd1dc-d683-444b-a56e-58c76f8d31bf'
        },
        {
          label: 'Single parent family',
          value: 'singleParent',
          nextStepId: '3d2fd1dc-d683-444b-a56e-58c76f8d31bf'
        }
      ]
    },
    {
      id: '472a7f69-3441-416a-81c2-0935dee47c8a',
      title: 'What type of visa do you have?',
      stepType: 'Question',
      nextStepId: '67d3ead5-359b-4f46-b446-dc84c778b9ea',
      template: 'SingleSelect',
      options: [
        {
          label: 'Visitor',
          value: 'visitor',
          nextStepId: '67d3ead5-359b-4f46-b446-dc84c778b9ea'
        },
        {
          label: 'Wokring',
          value: 'working',
          nextStepId: '67d3ead5-359b-4f46-b446-dc84c778b9ea'
        },
        {
          label: 'Student',
          value: 'student',
          nextStepId: '67d3ead5-359b-4f46-b446-dc84c778b9ea'
        }
      ]
    },
    {
      id: 'd2da8749-c8f0-4982-9aff-c234482dc549',
      title: 'What’s your annual taxable income tier?',
      stepType: 'Question',
      nextStepId: '9b4926d4-a4b7-4db4-9b8f-c0ab1bc80d7d',
      template: 'SingleSelect',
      options: [
        {
          label: '$93,000 or less (Base tier) ',
          value: 'Base',
          nextStepId: '9b4926d4-a4b7-4db4-9b8f-c0ab1bc80d7d'
        },
        {
          label: '$93,001 – $108,000 (Tier 1)',
          value: '1',
          nextStepId: '9b4926d4-a4b7-4db4-9b8f-c0ab1bc80d7d'
        },
        {
          label: '$108,001 – $144,000 (Tier 2)',
          value: '2',
          nextStepId: '9b4926d4-a4b7-4db4-9b8f-c0ab1bc80d7d'
        },
        {
          label: '$144,001 or more (Tier 3)',
          value: '3',
          nextStepId: '9b4926d4-a4b7-4db4-9b8f-c0ab1bc80d7d'
        }
      ]
    },
    {
      id: '466827d8-2fd9-4417-9d8e-ac5944d120b8',
      title: 'What’s your household annual taxable income tier?',
      stepType: 'Question',
      nextStepId: '9b4926d4-a4b7-4db4-9b8f-c0ab1bc80d7d',
      template: 'SingleSelect',
      options: [
        {
          label: '$186,000 or less (Base tier)',
          value: 'Base',
          nextStepId: '9b4926d4-a4b7-4db4-9b8f-c0ab1bc80d7d'
        },
        {
          label: '$186,001 – $216,000 (Tier 1)',
          value: '1',
          nextStepId: '9b4926d4-a4b7-4db4-9b8f-c0ab1bc80d7d'
        },
        {
          label: '$216,001 – $288,000 (Tier 2)',
          value: '2',
          nextStepId: '9b4926d4-a4b7-4db4-9b8f-c0ab1bc80d7d'
        },
        {
          label: '$288,001 or more (Tier 3)',
          value: '3',
          nextStepId: '9b4926d4-a4b7-4db4-9b8f-c0ab1bc80d7d'
        }
      ]
    },
    {
      id: '52ab5245-e6df-4c23-9f5e-7e307747243e',
      title: 'When are you considering purchasing your new health insurance policy?',
      stepType: 'Question',
      nextStepId: '7aff3d2e-9ffc-4a78-bd00-5bcc7091288f',
      template: 'SingleSelect',
      options: [
        {
          label: 'As soon as possible',
          value: 'Now',
          nextStepId: '7aff3d2e-9ffc-4a78-bd00-5bcc7091288f'
        },
        {
          label: 'In the next 3 months',
          value: 'Short',
          nextStepId: '7aff3d2e-9ffc-4a78-bd00-5bcc7091288f'
        },
        {
          label: 'In the next year',
          value: 'Medium',
          nextStepId: '7aff3d2e-9ffc-4a78-bd00-5bcc7091288f'
        },
        {
          label: "I'm not sure",
          value: 'NotSure',
          nextStepId: '7aff3d2e-9ffc-4a78-bd00-5bcc7091288f'
        }
      ]
    },
    {
      id: 'e8829359-9209-452a-9d87-5c014d770a9a',
      title: 'Do you consent?',
      description:
        'Answer a couple of questions to let us know what sort of car you are looking for. We will give you an estimate on how much you could save with a Flare Novated Lease.',
      stepType: 'Consent',
      nextStepId: '12b7666c-f7f4-4961-a8e8-90eb619ef70f'
    }
  ]
};

const mockHealthInsuranceCalculation: GetCalculationResponse = {
  title: 'All done! A Compare Club representative will be in touch shortly',
  description:
    'Through our partnership with Compare Club we have found more than 10 policies which might be suitable for you at one of their 6 private health insurance partners:',
  imageUrl:
    'https://images.ctfassets.net/hos0i9i3wvo7/SIN76R5h9sDQzA0g8Xm1C/0270d617815ded001f5d3feb43831cac/HealthInsuranceBrands.svg'
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
  _activityId: string
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

  const getActivity = async (): Promise<void> => {
    // TODO: Fetch from API

    // await new Promise(() =>
    // setTimeout(() => {
    setStepsResponse(mockHealthInsuranceSteps);
    // }, 1000)
    // ).then(() => {});
  };

  const progressActivity = async (answers: AssessmentAnswers): Promise<void> => {
    // TODO: POST to API

    //await new Promise(() =>
    //  setTimeout(() => {
    console.log(answers);
    //  }, 1000)
    //).then(() => {

    //});
  };

  const getCalculation = async (): Promise<void> => {
    // TODO: GET from API

    //await new Promise(() =>
    //  setTimeout(() => {
    setCalculationResponse(mockHealthInsuranceCalculation);
    //  }, 1000)
    //).then(() => {

    //});
  };

  return {
    activity: stepsResponse,
    getActivity,
    progressActivity,
    calculation: calculationResponse,
    getCalculation
  };
};

export default useBenefitsPlanApi;

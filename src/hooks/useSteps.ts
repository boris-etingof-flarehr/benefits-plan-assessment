import { useState } from 'preact/hooks';
import { Step } from 'src/services/backend-api';

export type AppStep = Step | 'Loading' | 'Intro' | 'GetApp';

interface Input {
  configuredSteps: Step[];
  isComplete: boolean;
}

export function useSteps(): [
  AppStep,
  // eslint-disable-next-line no-unused-vars
  (initialInput?: Input) => void,
  { current: number; total: number }
] {
  const [input, setInput] = useState<Input>({ configuredSteps: [], isComplete: false });
  const [currentStep, setCurrentStep] = useState<AppStep>('Loading');

  const setNextStep = (initialInput?: Input): void => {
    if (initialInput) setInput(initialInput);
    setCurrentStep(getNextStep(currentStep, initialInput ?? input));
  };

  const totalNumSteps = input.configuredSteps.length + 1;
  const stepNumber = (): number => {
    switch (currentStep) {
      case 'Loading':
      case 'Intro':
        return 0;
      case 'GetApp':
        return totalNumSteps;
      default:
        return input.configuredSteps.indexOf(currentStep) + 1;
    }
  };

  return [currentStep, setNextStep, { current: stepNumber(), total: totalNumSteps }];
}

function getNextStep(currentStep: AppStep, input: Input): AppStep {
  let nextStep: AppStep | undefined;

  if (currentStep === 'Intro') {
    nextStep = input.configuredSteps.at(0);
  } else if (currentStep === 'Loading') {
    nextStep = input.isComplete ? 'GetApp' : 'Intro';
  } else if (currentStep === 'GetApp') {
    nextStep = 'GetApp';
  } else {
    const index = input.configuredSteps.indexOf(currentStep);
    if (index !== -1 && currentStep !== input.configuredSteps.at(-1)) {
      nextStep = input.configuredSteps.at(index + 1);
    } else {
      nextStep = 'GetApp';
    }
  }

  if (!nextStep) throw new Error('nextStep was not set');
  return nextStep;
}

import { useCallback, useState } from 'preact/hooks';

const FIRST_STEP = StepName.PHONE_NUMBER;

export const enum StepName {
  PHONE_NUMBER = 0,
  OTP = 1,
  SUCCESS = 2
}

const useStep = (): {
  step: number;
  goBack: () => void;
  goToStep: (stepName: number) => void;
} => {
  const [step, setStep] = useState(FIRST_STEP);

  const goBack = useCallback(() => {
    const previousStep = step - 1;
    if (previousStep >= FIRST_STEP) {
      setStep(previousStep);
    }
  }, [step]);

  const goToStep = useCallback(
    (stepNumber: number) => {
      if (stepNumber <= 2) {
        setStep(stepNumber);
      }
    },
    [step]
  );

  return {
    step,
    goBack,
    goToStep
  };
};

export default useStep;

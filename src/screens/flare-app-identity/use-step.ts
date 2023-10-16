import { useCallback, useState } from 'preact/hooks';

const FIRST_STEP = 1;

const useStep = (
  totalNumberOfSteps: number
): {
  step: number;
  goBack: () => void;
  goNext: () => void;
} => {
  const [step, setStep] = useState(FIRST_STEP);

  const goBack = useCallback(() => {
    const previousStep = step - 1;
    if (previousStep >= FIRST_STEP) {
      setStep(previousStep);
    }
  }, [step]);

  const goNext = useCallback(() => {
    const nextStep = step + 1;
    if (nextStep <= totalNumberOfSteps) {
      setStep(nextStep);
    }
  }, [step, totalNumberOfSteps]);

  return {
    step,
    goBack,
    goNext
  };
};

export default useStep;

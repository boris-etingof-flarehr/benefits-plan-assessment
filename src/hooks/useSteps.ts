import { useState } from 'preact/hooks';

import { Step, MarketplaceOffer, Content } from 'src/services/backend-api';

export type AppStep = Step | 'Loading' | 'Intro' | 'GetApp' | 'AllSet';

export interface StepInfo {
  name: AppStep;
  content?: Content;
}

interface Input {
  offers: MarketplaceOffer[];
  isComplete: boolean;
}

type UseStepsReturnType = [
  StepInfo,
  // eslint-disable-next-line no-unused-vars
  (initialInput?: Input) => void,
  { current: number; total: number }
];

export function useSteps(): UseStepsReturnType {
  const [input, setInput] = useState<Input>({ offers: [], isComplete: false });
  const [currentStep, setCurrentStep] = useState<StepInfo>({ name: 'Loading', content: undefined });

  const setNextStep = (initialInput?: Input): void => {
    if (initialInput) setInput(initialInput);
    setCurrentStep(getNextStep(currentStep, initialInput ?? input));
  };

  const totalNumSteps = input.offers.length + 1;
  const stepNumber = (): number => {
    switch (currentStep.name) {
      case 'Loading':
      case 'Intro':
        return 0;
      case 'GetApp':
      case 'AllSet':
        return totalNumSteps;
      default:
        return input.offers.findIndex((step) => step.name === currentStep.name) + 1;
    }
  };

  return [currentStep, setNextStep, { current: stepNumber(), total: totalNumSteps }];
}

function getNextStep(currentStep: StepInfo, input: Input): StepInfo {
  let nextStep: StepInfo;

  const summaryStepName = isPerksConfigured(input.offers) ? 'GetApp' : 'AllSet';

  switch (currentStep.name) {
    case 'Loading':
      nextStep = { name: input.isComplete ? summaryStepName : 'Intro' };
      break;
    case 'GetApp':
    case 'AllSet':
      nextStep = { name: currentStep.name };
      break;
    case 'Intro':
      nextStep = getMarketplaceOffer(currentStep.name, input.offers, summaryStepName, true);
      break;
    default:
      nextStep = getMarketplaceOffer(currentStep.name, input.offers, summaryStepName, false);
  }

  validateStepInfo(nextStep, input);
  return nextStep;
}

function getMarketplaceOffer(
  currentStepName: AppStep,
  marketplaceOffers: MarketplaceOffer[],
  summaryStep: AppStep,
  isFirstStep: boolean
): StepInfo {
  if (isFirstStep) {
    return { name: marketplaceOffers[0].name, content: marketplaceOffers[0].content };
  }

  const currentStepIndex = marketplaceOffers.findIndex((offer) => offer.name === currentStepName);
  const lastStep = marketplaceOffers[marketplaceOffers.length - 1];

  if (currentStepIndex === -1 || currentStepName === lastStep.name) {
    return { name: summaryStep };
  }

  const nextStep = marketplaceOffers[currentStepIndex + 1];
  return { name: nextStep.name, content: nextStep.content };
}

function validateStepInfo(stepInfo: StepInfo, input: Input): void {
  if (!stepInfo.name) throw new Error('nextStep was not set');
  if (input.offers.some((step) => step.name === stepInfo.name) && !stepInfo.content) {
    throw new Error('Configured step does not have any content');
  }
}

function isPerksConfigured(offers: MarketplaceOffer[]): boolean {
  return offers.some((offer) => offer.name === 'Perks');
}

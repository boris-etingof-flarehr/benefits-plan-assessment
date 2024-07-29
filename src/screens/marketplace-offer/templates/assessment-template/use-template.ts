import { AssessmentContent, MarketplaceOfferT } from '@app/app.model';
import { useCallback, useMemo, useRef, useState } from 'preact/hooks';

import { AssessmentAnswers, Question, QuestionId, QuestionValue, SubmissionResult } from './models';
import useBenefitsPlanApi, { getQuestionsFromSteps } from './use-benefits-plan-api';

export enum Slide {
  BriefIntroduction,
  Questions,
  SubmissionResult
}

const useTemplate = (
  offer: MarketplaceOfferT<AssessmentContent>,
  acceptButtonText: string | undefined,
  declineButtonText: string | undefined,
  onComplete?: () => void,
): {
  title: string | undefined;
  description: string | undefined;
  primaryButtonEnabled: boolean;
  primaryButtonText: string | undefined;
  secondaryButtonText: string | undefined;
  currentSlide: Slide;
  goToNextSlide: () => Promise<void>;
  questions: ReadonlyArray<Question> | undefined;
  calculateUpdatedAnswers: (newAnswers: AssessmentAnswers) => ReadonlyArray<{
    questionId: QuestionId;
    answer: QuestionValue | undefined;
    customerAttribute: string;
  }>;
  updateAnswers: (_value: AssessmentAnswers) => void;
  submissionResult: SubmissionResult | undefined;
} => {
  const { activity, getActivity, progressActivity, calculation, getCalculation } =
    useBenefitsPlanApi(offer.content.assessmentId);

  const questions = useMemo(
    () => (activity ? getQuestionsFromSteps(activity.firstStepId, activity.steps) : undefined),
    [activity]
  );

  const [currentSlide, setSlide] = useState<Slide>(Slide.BriefIntroduction);

  const allAnswersIncludingHidden = useRef<AssessmentAnswers | undefined>();

  const activityAnswers = useRef<AssessmentAnswers>({});

  const calculateUpdatedAnswers = useCallback(
    (
      newAnswers: AssessmentAnswers
    ): ReadonlyArray<{
      questionId: QuestionId;
      answer: QuestionValue | undefined;
      customerAttribute: string;
    }> => {
      const currentAnswers = allAnswersIncludingHidden.current;

      if (!currentAnswers) {
        return [];
      }

      return Object.entries(newAnswers)
        .filter(([key, value]) => currentAnswers[key] !== value)
        .map(([key, value]) => ({
          questionId: key,
          answer: value,
          customerAttribute: activity?.steps.find((o) => o.id === key)?.customerAttribute ?? ''
        }));
    },
    [activity?.steps]
  );

  const updateAnswers = (value: AssessmentAnswers): void => {
    activityAnswers.current = value;
    allAnswersIncludingHidden.current = { ...allAnswersIncludingHidden.current, ...value };
    setPrimaryButtonEnabled(!Object.values(value).some((o) => !o));
  };

  const goToNextSlide = useCallback(async (): Promise<void> => {
    switch (currentSlide) {
      case Slide.BriefIntroduction:
        await getActivity();
        setSlide(Slide.Questions);
        break;
      case Slide.Questions:
        await progressActivity(activityAnswers.current);
        await getCalculation();
        setSlide(Slide.SubmissionResult);
        break;
      case Slide.SubmissionResult:
        break;
    }
  }, [currentSlide, getActivity, getCalculation, progressActivity]);

  const title = useMemo(() => {
    switch (currentSlide) {
      case Slide.BriefIntroduction:
      case Slide.Questions:
        return offer.content.title;
      case Slide.SubmissionResult:
        return calculation?.estimates.primary.title;
      default:
        return undefined;
    }
  }, [calculation?.estimates.primary.title, currentSlide, offer.content.title]);

  const description = useMemo(() => {
    switch (currentSlide) {
      case Slide.BriefIntroduction:
      case Slide.Questions:
        return offer.content.description;
      case Slide.SubmissionResult:
        return calculation?.estimates.blurb.text;
      default:
        return undefined;
    }
  }, [calculation?.estimates.blurb.text, currentSlide, offer.content.description]);

  const [primaryButtonEnabled, setPrimaryButtonEnabled] = useState(true);

  const primaryButtonText = useMemo(() => {
    switch (true) {
      case currentSlide === Slide.BriefIntroduction:
        return acceptButtonText;
      case currentSlide === Slide.Questions:
        return 'Submit';
      case currentSlide === Slide.SubmissionResult && !!onComplete:
        return 'Next';
      default:
        return undefined;
    }
  }, [acceptButtonText, currentSlide]);

  const secondaryButtonText = useMemo(() => {
    switch (currentSlide) {
      case Slide.BriefIntroduction:
        return declineButtonText;
      case Slide.Questions:
        return 'Skip for now';
      case Slide.SubmissionResult:
        return undefined;
      default:
        return undefined;
    }
  }, [currentSlide, declineButtonText]);

  return {
    title,
    description,
    primaryButtonEnabled,
    primaryButtonText,
    secondaryButtonText,
    currentSlide,
    goToNextSlide,
    questions,
    calculateUpdatedAnswers,
    updateAnswers,
    submissionResult: calculation ? { imageUrl: calculation.estimates.blurb.imageUrl } : undefined
  };
};

export default useTemplate;

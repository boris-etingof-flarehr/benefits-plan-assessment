import { MarketplaceOffer } from '@app/app.model';
import Button from '@app/components/button';
import LeftRightLayout from '@app/layouts/left-right-layout';
import { Transition } from '@headlessui/react';
import DOMPurify from 'dompurify';
import { FunctionalComponent } from 'preact';
import { FC, useCallback, useEffect } from 'preact/compat';

import LearnMorePanel from '../../learn-more-panel';
import type { AssessmentId, Question, QuestionAnswer, SubmissionResult } from './models';
import Questions from './questions';
import useTemplate, { Slide } from './use-template';

type Props = {
  stepNumber: {
    current: number;
    total: number;
  };
  step: MarketplaceOffer & {
    content: {
      activityId: AssessmentId;
    };
  };
  acceptButton: { text?: string; class?: string };
  declineButton: { text?: string; class?: string; onClick: () => void };
  onComplete: () => void;
};

const slideIndexes = Object.values(Slide).filter((v) => !isNaN(Number(v)));

const getSlidingTransitionCssClasses = (slide: Slide, activeSlild: Slide): string | undefined => {
  const slideIndex = slideIndexes.indexOf(slide);
  const activeSlideIndex = slideIndexes.indexOf(activeSlild);

  if (slideIndex < activeSlideIndex) {
    return `transition duration-300 -translate-x-[${(slideIndex + 1) * 100}%] opacity-0 h-0`;
  }

  if (slideIndex === activeSlideIndex) {
    return `transition duration-300 -translate-x-[${slideIndex * 100}%] opacity-100 h-full`;
  }

  if (slideIndex > activeSlideIndex) {
    return `transition duration-300 -translate-x-[${(slideIndex - 1) * 100}%] opacity-0 h-0`;
  }
};

type ContentProps = {
  currentSlide: Slide;
  offer: MarketplaceOffer;
  questions: ReadonlyArray<Question> | undefined;
  onQuestionsAnswered: (_value: QuestionAnswer) => void;
  submissionResult?: SubmissionResult;
};
const ContentSlide: FC<ContentProps> = (props) => {
  return (
    <div className="flex flex-row">
      <div className="-translate-x-[0%] -translate-x-[100%] -translate-x-[200%]" />
      <div
        className={`w-full flex-none ${getSlidingTransitionCssClasses(Slide.BriefIntroduction, props.currentSlide)}`}
      >
        <LearnMorePanel items={props.offer.content.details} />
      </div>
      <div
        className={`w-full flex-none ${getSlidingTransitionCssClasses(Slide.Questions, props.currentSlide)}`}
      >
        {props.questions && (
          <form>
          <Questions questions={props.questions} onChange={props.onQuestionsAnswered} />
          </form>
        )}
      </div>
      <div
        className={`w-full flex-none ${getSlidingTransitionCssClasses(Slide.SubmissionResult, props.currentSlide)}`}
      >
        <img
          class="mt-4 max-w-full w-full mx-auto"
          src={props.submissionResult?.imageUrl}
          loading="lazy"
        />
      </div>
    </div>
  );
};

const AssessmentTemplate: FunctionalComponent<Props> = (props) => {
  const {
    title,
    description,
    currentSlide,
    goToNextSlide,
    primaryButtonEnabled,
    primaryButtonText,
    secondaryButtonText,
    questions,
    updateAnswers,
    submissionResult
  } = useTemplate(props.step, props.acceptButton.text, props.declineButton.text);

  useEffect(() => {
    // TODO: SEND OFFER VIEWED EVENT
  }, []);

  const handlePrimaryButtonClick = useCallback(async (): Promise<void> => {
    if (currentSlide === Slide.BriefIntroduction) {
      // TODO: SEND OFFER ACCEPTED EVENT
    }

    if (currentSlide !== Slide.SubmissionResult) {
      goToNextSlide();
    }

    if (currentSlide === Slide.SubmissionResult) {
      props.onComplete();
    }
  }, [currentSlide, goToNextSlide, props]);

  const handleSecondaryButtonClick = useCallback(async (): Promise<void> => {
    // TODO: SEND DECLINED EVENT

    props.declineButton.onClick();
  }, [props.declineButton]);

  return (
    <LeftRightLayout>
      <LeftRightLayout.Left>
        <div>
          <div class="flex justify-between md:block text-xs tracking-wide">
            <span class="relative px-3 py-0.5 text-primary-base font-semibold">
              {props.stepNumber.current} OF {props.stepNumber.total}
              <span class="absolute left-0 rounded-xl bg-primary-base opacity-10 w-full h-[90%]" />
            </span>
          </div>
          <Transition
            appear={true}
            show={true}
            enter="transition duration-700 ease-out md:transition-none"
            enterFrom="-translate-y-6"
            enterTo="translate-y-0"
          >
            <div class="flex flex-col justify-stretch md:max-w-[27.5rem]">
              <h3 class="mt-8 md:mt-3 text-2xl md:text-3xl leading-8 md:leading-9 font-bold">
                {title}
              </h3>
              {description && (
                <p class="mt-2 text-base md:text-lg leading-6 md:leading-7 text-gray-600 break-words">
                  {description}
                </p>
              )}

              <div className="mt-6">
                <ContentSlide
                  currentSlide={currentSlide}
                  offer={props.step}
                  questions={questions}
                  onQuestionsAnswered={updateAnswers}
                  submissionResult={submissionResult}
                />
              </div>
              <div class="flex flex-col md:flex-row md:justify-between gap-4 md:max-w-[27.5rem] mt-6 md:mt-11">
                {primaryButtonText && (
                  <Button
                    class=""
                    disabled={!primaryButtonEnabled}
                    onClickPromise={handlePrimaryButtonClick}
                  >
                    {primaryButtonText}
                  </Button>
                )}
                {secondaryButtonText && (
                  <Button
                    class="bg-white hover:!bg-gray-100 focus:!ring-gray-200 !border-0 !shadow-none !text-gray-700 !border-gray-300"
                    onClickPromise={handleSecondaryButtonClick}
                  >
                    {secondaryButtonText}
                  </Button>
                )}
              </div>
              <div
                className={`flex flex-col gap-3 mt-6 text-gray-600 text-xs ${getSlidingTransitionCssClasses(Slide.BriefIntroduction, currentSlide)}`}
              >
                {props.step.content.terms.map((term, index) => (
                  <span
                    key={index}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(term, { ADD_ATTR: ['target'] })
                    }}
                  />
                ))}
              </div>
            </div>
          </Transition>
        </div>
      </LeftRightLayout.Left>
      <LeftRightLayout.Right>
        <img
          class="max-w-[30rem] w-full hidden md:block"
          src={props.step.content.imageUrl}
          loading="lazy"
        />
      </LeftRightLayout.Right>
    </LeftRightLayout>
  );
};

export default AssessmentTemplate;

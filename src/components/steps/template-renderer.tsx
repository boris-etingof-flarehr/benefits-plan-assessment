import { FunctionalComponent } from 'preact';

import { Content, Step } from 'src/services/backend-api';
import SimpleTemplate from './templates/simple-template';
import EoiTemplate from './templates/eoi-template';

interface Props {
  stepNumber: {
    current: number;
    total: number;
  };
  step: Step;
  content: Content;
  onStepComplete: () => void;
}

function exhaustiveGuard(_value: never): never {
  throw new Error(
    `ERROR! Reached forbidden guard function with unexpected value: ${JSON.stringify(_value)}`
  );
}

const TemplateRenderer: FunctionalComponent<Props> = (props) => {
  switch (props.content.template) {
    case 'Eoi':
      return (
        <EoiTemplate
          stepNumber={props.stepNumber}
          step={props.step}
          content={props.content}
          primaryButton={{
            text: props.content.acceptButton,
            onClick: props.onStepComplete
          }}
          secondaryButton={{
            text: props.content.declineButton,
            onClick: props.onStepComplete
          }}
        />
      );
    case 'Simple':
      return (
        <SimpleTemplate
          stepNumber={props.stepNumber}
          step={props.step}
          image={{
            mobileSrc: props.content.imageUrl,
            desktopSrc: props.content.mobileImageUrl
          }}
          title={props.content.title}
          info={props.content.description}
          learnMoreText={props.content.details}
          termsAndConditions={props.content.terms}
          primaryButton={{
            text: props.content.acceptButton,
            onClick: props.onStepComplete
          }}
        />
      );
    default:
      return exhaustiveGuard(props.content.template);
  }
};

export default TemplateRenderer;

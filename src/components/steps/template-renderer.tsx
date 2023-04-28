import { FunctionalComponent } from 'preact';

import { MarketplaceOffer } from 'src/services/backend-api';
import SimpleTemplate from './templates/simple-template';
import EoiTemplate from './templates/eoi-template';

interface Props {
  stepNumber: {
    current: number;
    total: number;
  };
  marketPlaceOffer: MarketplaceOffer;
  onStepComplete: () => void;
}

function exhaustiveGuard(_value: never): never {
  throw new Error(
    `ERROR! Reached forbidden guard function with unexpected value: ${JSON.stringify(_value)}`
  );
}

const TemplateRenderer: FunctionalComponent<Props> = (props) => {
  switch (props.marketPlaceOffer.content.template) {
    case 'Eoi':
      return (
        <EoiTemplate
          stepNumber={props.stepNumber}
          step={props.marketPlaceOffer}
          primaryButton={{
            text: props.marketPlaceOffer.content.acceptButton,
            onClick: props.onStepComplete
          }}
          secondaryButton={{
            text: props.marketPlaceOffer.content.declineButton,
            onClick: props.onStepComplete
          }}
        />
      );
    case 'Simple':
      return (
        <SimpleTemplate
          stepNumber={props.stepNumber}
          step={props.marketPlaceOffer}
          primaryButton={{
            text: props.marketPlaceOffer.content.acceptButton,
            onClick: props.onStepComplete
          }}
        />
      );
    default:
      return exhaustiveGuard(props.marketPlaceOffer.content.template);
  }
};

export default TemplateRenderer;

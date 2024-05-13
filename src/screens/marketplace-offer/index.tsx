import { FunctionalComponent } from 'preact';

import { AssessmentContent, MarketplaceOffer, MarketplaceOfferT } from '../../app.model';
import AssessmentTemplate from './templates/assessment-template';
import EoiTemplate from './templates/eoi-template';
import SimpleTemplate from './templates/simple-template';

interface Props {
  stepNumber: {
    current: number;
    total: number;
  };
  marketPlaceOffer: MarketplaceOffer;
  onStepComplete: () => void;
}

const Index: FunctionalComponent<Props> = (props) => {
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
    case 'Assessment':
      return (
        <AssessmentTemplate
          key={props.marketPlaceOffer.name}
          stepNumber={props.stepNumber}
          step={props.marketPlaceOffer as MarketplaceOfferT<AssessmentContent>}
          acceptButton={{
            text: props.marketPlaceOffer.content.acceptButton
          }}
          declineButton={{
            text: props.marketPlaceOffer.content.declineButton,
            onClick: props.onStepComplete
          }}
          onComplete={props.onStepComplete}
        />
      );
  }
};

export default Index;

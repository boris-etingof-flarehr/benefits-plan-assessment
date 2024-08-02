import axios from 'axios';
import { FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';

import { AssessmentContent, MarketplaceOfferT } from './app.model';
import css from './index.css?inline';
import AssessmentTemplate from './screens/marketplace-offer/templates/assessment-template';

const cssVars = `
  :host {
    --fl-color-primary: #1890ff;
    --fl-color-primary-light: #74c0ff;
    --fl-color-primary-dark: #006bce;
    --fl-color-primary-disabled: #f5f5f5;
    --fl-color-primary-hover: #40a9ff;
    --fl-color-primary-focus: #40a9ff;
    --fl-color-primary-text: white;
    --fl-color-secondary: #d3d3d3;
    --fl-color-secondary-light: #e1e1e1;
    --fl-color-secondary-dark: #cecece;
    --fl-color-secondary-disabled: #f5f5f5;
    --fl-color-secondary-hover: #ebebeb;
    --fl-color-secondary-focus: #ebebeb;
    --fl-color-secondary-text: #262626;
  }
`;

interface Props {
  'base-url': string;
  'profile-id': string;
  'access-token': string;
  'image-url': string;
  'assessment-id': string;
  'track-client': string;
  'track-source': string;
  'track-source-id': string;
  'track-channel': string;
  'metadata-feature-name': string;
  'metadata-treatment-name': string;
  title?: string;
  description?: string;
  'accept-button'?: string;
  'decline-button'?: string;
  'step-number-current'?: string;
  'step-number-total'?: string;
  'vertical-alignment'?: string;
  'skip-intro'?: string;
  terms?: string[];
  details?: string[];
  onAccepted?: () => Promise<void>;
  onDeclined?: () => Promise<void>;
  onComplete?: () => void;
}

const App: FunctionalComponent<Props> = (props) => {
  useEffect(() => {
    axios.defaults.baseURL = `${props['base-url']}/benefits-plan/workplace-backend`;
    axios.defaults.headers.common['X-PROFILE-ID'] = props['profile-id'];
    axios.defaults.headers.Authorization = `Bearer ${props['access-token']}`;
    axios.defaults.params = {
      client: props['track-client'],
      source: props['track-source'],
      channel: props['track-channel']
    };
  }, [props]);

  const marketPlaceOffer = {
    content: {
      title: props.title,
      description: props.description,
      imageUrl: props['image-url'],
      acceptButton: props['accept-button'],
      assessmentId: props['assessment-id'],
      declineButton: props['decline-button'],
      template: 'Assessment',
      terms: props.terms,
      details: props.details
    },
    metadata: {
      featureName: props['metadata-feature-name'],
      treatmentName: props['metadata-treatment-name']
    }
  };

  const stepNumber =
    props['step-number-current'] && props['step-number-total']
      ? {
          current: parseInt(props['step-number-current'], 10),
          total: parseInt(props['step-number-total'], 10)
        }
      : undefined;

  return (
    <>
      <style>{cssVars + css.toString()}</style>
      <div class="font-inter">
        <AssessmentTemplate
          skipIntro={props['skip-intro'] === 'true'}
          stepNumber={stepNumber}
          verticalAlignment={props['vertical-alignment']}
          step={marketPlaceOffer as MarketplaceOfferT<AssessmentContent>}
          acceptButton={{ text: marketPlaceOffer.content.acceptButton }}
          declineButton={{ text: marketPlaceOffer.content.declineButton }}
          onAccepted={props.onAccepted}
          onDeclined={props.onDeclined}
          onComplete={props.onComplete}
        />
      </div>
    </>
  );
};

export default App;

import { FunctionalComponent } from 'preact';

import { AssessmentContent, MarketplaceOfferT } from './app.model';
import css from './index.css?inline';
import AssessmentTemplate from './screens/marketplace-offer/templates/assessment-template';
import { useEffect } from 'preact/hooks';
import axios from 'axios';

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
  title: string;
  'image-url': string;
  'assessment-id': string;
  'track-client': string;
  'track-source': string;
  'track-channel': string;
  'metadata-feature-name': string;
  'metadata-treatment-name': string;

  description?: string;
  'accept-button'?: string;
  'decline-button'?: string;
  'step-number-current'?: string;
  'step-number-total'?: string;
  terms?: string[];
  details?: string[];
  onDeclineButtonPress?: () => any;
  onComplete?: () => any;
}

const App: FunctionalComponent<Props> = (props) => {
  useEffect(() => {
    axios.defaults.baseURL = props['base-url'];
    axios.defaults.headers.common['X-PROFILE-ID'] = props['profile-id'];
    axios.defaults.headers.Authorization = `Bearer ${props['access-token']}`;
    axios.defaults.params = {
      client: props['track-client'],
      source: props['track-source'],
      channel: props['track-channel']
    };
  }, []);

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
          current: parseInt(props['step-number-current']),
          total: parseInt(props['step-number-total'])
        }
      : undefined;

  return (
    <>
      <style>{cssVars + css.toString()}</style>
      <div class="font-inter">
        <AssessmentTemplate
          stepNumber={stepNumber}
          step={marketPlaceOffer as MarketplaceOfferT<AssessmentContent>}
          acceptButton={{ text: marketPlaceOffer.content.acceptButton }}
          declineButton={
            props.onDeclineButtonPress
              ? {
                  text: marketPlaceOffer.content.declineButton,
                  onClick: props.onDeclineButtonPress
                }
              : undefined
          }
          onComplete={props.onComplete}
        />
      </div>
    </>
  );
};

export default App;

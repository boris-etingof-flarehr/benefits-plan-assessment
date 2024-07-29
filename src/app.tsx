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
  data: {
    baseURL: string;
    profileId: string;
    accessToken: string;
    marketPlaceOffer: MarketplaceOfferT<AssessmentContent>;
    params: { client: string; source: string; channel: string };
    stepNumber: { current: number; total: number };
    onDeclineButtonPress: () => void;
    onComplete: () => void;
  };
}
const App: FunctionalComponent<Props> = (props) => {
  useEffect(() => {
    if (props.data) {
      axios.defaults.baseURL = props.data?.baseURL;
      axios.defaults.headers.common['X-PROFILE-ID'] = props.data?.profileId;
      axios.defaults.headers.Authorization = `Bearer ${props.data?.accessToken}`;
      axios.defaults.params = props.data?.params;
    }
  }, [props.data]);

  return (
    <>
      <style>{cssVars + css.toString()}</style>

      {props.data ? (
        <div class="font-inter">
          <AssessmentTemplate
            stepNumber={props.data.stepNumber}
            step={props.data.marketPlaceOffer as MarketplaceOfferT<AssessmentContent>}
            acceptButton={{ text: props.data.marketPlaceOffer.content.acceptButton }}
            declineButton={{
              text: props.data.marketPlaceOffer.content.declineButton,
              onClick: props.data.onDeclineButtonPress
            }}
            onComplete={props.data.onComplete}
          />
        </div>
      ) : null}
    </>
  );
};

export default App;

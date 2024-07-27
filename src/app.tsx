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
  ['backend-url']: string;
  ['access-token']: string;
  ['profile-id']: string;
  ['client']: string;
  ['source']: string;
  ['channel']: string;
}

const App: FunctionalComponent<Props> = (props) => {
  const accessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjYjQyNzQyYWU1OGY0ZGE0NjdiY2RhZWE0Yjk1YTI5ZmJhMGM1ZjkiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25fQXBvbGxvUHJvZmlsZXMiOiJBUC1DNDlFRDMwNy0xRTU5LTQzMUUtOEE5My1GOTJGNzg2QkI1MjkiLCJleHRlbnNpb25fVW5lc3RhYmxpc2hlZEFwb2xsb1Byb2ZpbGVzIjoiIiwiY3VzdG9tZXJJZCI6IjMzY2FhNGVhLTNiNmItNDJlYy1hODc5LWI2YjNkNjFkYWRkMCIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9mbGFyZS1hcHAtYXV0b2RldiIsImF1ZCI6ImZsYXJlLWFwcC1hdXRvZGV2IiwiYXV0aF90aW1lIjoxNzIxNzEyODgwLCJ1c2VyX2lkIjoiMzNjYWE0ZWEtM2I2Yi00MmVjLWE4NzktYjZiM2Q2MWRhZGQwIiwic3ViIjoiMzNjYWE0ZWEtM2I2Yi00MmVjLWE4NzktYjZiM2Q2MWRhZGQwIiwiaWF0IjoxNzIyMTE5OTg5LCJleHAiOjE3MjIxMjM1ODksInBob25lX251bWJlciI6Iis2MTQwNjEzNTc2NCIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzYxNDA2MTM1NzY0Il19LCJzaWduX2luX3Byb3ZpZGVyIjoiY3VzdG9tIn19.LuH7-KeUR1XORYcGC3w_q5oo-U6wsTuLudQWPMi6VcsTGyY2uKoq7ZN9X-L8bqKCm8DFqKlygXrGpt86G7cvEusCLNFIh-XSd8pOnKT3rIrCUXOSN-2Orev_IrotWlTzpSdM6wQ5ZBSeDsasH12KVmZeSIPsJCCOUYq1A2KfU0tMwK3i78vrSBlcPPvHSwwR9B9RXKt51ocgm66h5e7ZWCAp7Twc5duHBBOTKk1aZWQVbziid9Tea2NhSRH7i6DjW2JrY4ltOOcwBXsvbKoSabmGuDHRCjF-_W1hvYZvzMpFhmxXwrv7WEn96Jmo_lRRXTiowY5WHxz5IBdSpnL85Q';

  useEffect(() => {
    axios.defaults.baseURL = props['backend-url'];
    axios.defaults.headers.common['X-PROFILE-ID'] = props['profile-id'];
    axios.defaults.headers.Authorization = `Bearer ${props['access-token']}`;
    axios.defaults.params = { client: props['client'], source: props['source'], channel: props['channel'] };
  }, []);

  const stepNumber = { current: 1, total: 5 };
  const onDeclineButtonPress = () => {};
  const onComplete = () => {};

  const marketPlaceOffer = {
    name: 'Offer name',
    content: {
      title: 'Offer title',
      description: 'Offer description',
      details: ['details1', 'details2'],
      imageUrl: 'imageUrl',
      mobileImageUrl: 'mobileImageUrl',
      acceptButton: 'Accept Button',
      terms: ['terms'],
      template: 'Assessment',
      assessmentId: '78c71582-18f4-4f47-8b92-5a0dfc14d127',
      declineButton: 'Decline Button'
    },
    metadata: { featureName: 'string', treatmentName: 'string' }
  };

  return (
    <>
      <style>{cssVars + css.toString()}</style>

      <div class="font-inter pt-6 pb-8 md:py-24 px-px">
        <AssessmentTemplate
          stepNumber={stepNumber}
          step={marketPlaceOffer as MarketplaceOfferT<AssessmentContent>}
          acceptButton={{ text: marketPlaceOffer.content.acceptButton }}
          declineButton={{
            text: marketPlaceOffer.content.declineButton,
            onClick: onDeclineButtonPress
          }}
          onComplete={onComplete}
        />
      </div>
    </>
  );
};

export default App;

import { FunctionalComponent } from 'preact';

import { AssessmentContent, MarketplaceOfferT } from './app.model';
import css from './index.css?inline';
import AssessmentTemplate from './screens/marketplace-offer/templates/assessment-template';
import { useEffect } from 'preact/hooks';
import axios from 'axios';

interface Props {
  ['backend-url']: string;
  ['access-token']: string;
  ['workflows-instance-id']: string;
}

const App: FunctionalComponent<Props> = (props) => {
  const accessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjYjQyNzQyYWU1OGY0ZGE0NjdiY2RhZWE0Yjk1YTI5ZmJhMGM1ZjkiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25fQXBvbGxvUHJvZmlsZXMiOiJBUC1DNDlFRDMwNy0xRTU5LTQzMUUtOEE5My1GOTJGNzg2QkI1MjkiLCJleHRlbnNpb25fVW5lc3RhYmxpc2hlZEFwb2xsb1Byb2ZpbGVzIjoiIiwiY3VzdG9tZXJJZCI6IjMzY2FhNGVhLTNiNmItNDJlYy1hODc5LWI2YjNkNjFkYWRkMCIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9mbGFyZS1hcHAtYXV0b2RldiIsImF1ZCI6ImZsYXJlLWFwcC1hdXRvZGV2IiwiYXV0aF90aW1lIjoxNzIxNzEyODgwLCJ1c2VyX2lkIjoiMzNjYWE0ZWEtM2I2Yi00MmVjLWE4NzktYjZiM2Q2MWRhZGQwIiwic3ViIjoiMzNjYWE0ZWEtM2I2Yi00MmVjLWE4NzktYjZiM2Q2MWRhZGQwIiwiaWF0IjoxNzIxOTE1NjAzLCJleHAiOjE3MjE5MTkyMDMsInBob25lX251bWJlciI6Iis2MTQwNjEzNTc2NCIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzYxNDA2MTM1NzY0Il19LCJzaWduX2luX3Byb3ZpZGVyIjoiY3VzdG9tIn19.kDzrrrL5lsBUblhwLvZdWx_xaZ-1d_XTXLyFkoY5NFsc4duMAshAULU7c-inly456e1YyPaRskpDT5TzPbkOaZP519NYjOdiadjSbn6F2PneOzJHZg3RphOSORuo1NAQr7NI25M17S-aWearJO-gLG-MoGxDjB7sH29M9gLLf5ywEEbu-jOeOlBB6Y5pJdWwonS7aBtNNpx0snfRDSlidtWYZQcaGdoJndolUkdbqFYUEdxk5D2iJQkvulcMoYpzK4K3YbFWD82Lklb-uVr7mVPBH3jIb5VHPA9XV3XGc_e3y74WBRf2xJPl6Cn7mDSsdrY_gkzsasRuDBc2GPn1Og';

  useEffect(() => {
    axios.defaults.baseURL = '/benefits-plan';
    axios.defaults.headers.common['X-PROFILE-ID'] = 'AP-C49ED307-1E59-431E-8A93-F92F786BB529';
    axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
    // axios.defaults.params = { client: 'onboarding', source: 'Onboarding', channel: 'onboarding' };
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

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
  const accessToken =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjYjQyNzQyYWU1OGY0ZGE0NjdiY2RhZWE0Yjk1YTI5ZmJhMGM1ZjkiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25fQXBvbGxvUHJvZmlsZXMiOiJBUC1DNDlFRDMwNy0xRTU5LTQzMUUtOEE5My1GOTJGNzg2QkI1MjkiLCJleHRlbnNpb25fVW5lc3RhYmxpc2hlZEFwb2xsb1Byb2ZpbGVzIjoiIiwiY3VzdG9tZXJJZCI6IjMzY2FhNGVhLTNiNmItNDJlYy1hODc5LWI2YjNkNjFkYWRkMCIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9mbGFyZS1hcHAtYXV0b2RldiIsImF1ZCI6ImZsYXJlLWFwcC1hdXRvZGV2IiwiYXV0aF90aW1lIjoxNzIxNzEyODgwLCJ1c2VyX2lkIjoiMzNjYWE0ZWEtM2I2Yi00MmVjLWE4NzktYjZiM2Q2MWRhZGQwIiwic3ViIjoiMzNjYWE0ZWEtM2I2Yi00MmVjLWE4NzktYjZiM2Q2MWRhZGQwIiwiaWF0IjoxNzIxODc4OTYzLCJleHAiOjE3MjE4ODI1NjMsInBob25lX251bWJlciI6Iis2MTQwNjEzNTc2NCIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzYxNDA2MTM1NzY0Il19LCJzaWduX2luX3Byb3ZpZGVyIjoiY3VzdG9tIn19.boCliugnCYD-jc-qxQHuzV1DDh27kA9Rvya_CC0NGoHtnbJwY8k1Y1P7MwrAB5yKKci1iHwM_ubEBs0fjK-kjlSrI6jMSHnv5hGECrhqfFG-rxo1zihUqNYSAukzE0PgJiQwHvoXz4ppjDsbN0e1KeB7TSGmxzMLOpzZ-fUTBvW8SsLu5Bp02IRz_KVKaz6zxR1aSdtmYouj_W41SdVmm3CPwdnlKArJplQ6V-QAt7CC54HybQB836kK7ejotubRYiS-9WgyeOMFx3ZtqiRW6AQRo_kM018ajgbTItxzFuslIpPIjPdp0gY76fgn2rSjiyNMOn4DvXfoYHWlrUdymQ", "refreshToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjYjQyNzQyYWU1OGY0ZGE0NjdiY2RhZWE0Yjk1YTI5ZmJhMGM1ZjkiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25fQXBvbGxvUHJvZmlsZXMiOiJBUC1DNDlFRDMwNy0xRTU5LTQzMUUtOEE5My1GOTJGNzg2QkI1MjkiLCJleHRlbnNpb25fVW5lc3RhYmxpc2hlZEFwb2xsb1Byb2ZpbGVzIjoiIiwiY3VzdG9tZXJJZCI6IjMzY2FhNGVhLTNiNmItNDJlYy1hODc5LWI2YjNkNjFkYWRkMCIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9mbGFyZS1hcHAtYXV0b2RldiIsImF1ZCI6ImZsYXJlLWFwcC1hdXRvZGV2IiwiYXV0aF90aW1lIjoxNzIxNzEyODgwLCJ1c2VyX2lkIjoiMzNjYWE0ZWEtM2I2Yi00MmVjLWE4NzktYjZiM2Q2MWRhZGQwIiwic3ViIjoiMzNjYWE0ZWEtM2I2Yi00MmVjLWE4NzktYjZiM2Q2MWRhZGQwIiwiaWF0IjoxNzIxODc4OTYzLCJleHAiOjE3MjE4ODI1NjMsInBob25lX251bWJlciI6Iis2MTQwNjEzNTc2NCIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzYxNDA2MTM1NzY0Il19LCJzaWduX2luX3Byb3ZpZGVyIjoiY3VzdG9tIn19.boCliugnCYD-jc-qxQHuzV1DDh27kA9Rvya_CC0NGoHtnbJwY8k1Y1P7MwrAB5yKKci1iHwM_ubEBs0fjK-kjlSrI6jMSHnv5hGECrhqfFG-rxo1zihUqNYSAukzE0PgJiQwHvoXz4ppjDsbN0e1KeB7TSGmxzMLOpzZ-fUTBvW8SsLu5Bp02IRz_KVKaz6zxR1aSdtmYouj_W41SdVmm3CPwdnlKArJplQ6V-QAt7CC54HybQB836kK7ejotubRYiS-9WgyeOMFx3ZtqiRW6AQRo_kM018ajgbTItxzFuslIpPIjPdp0gY76fgn2rSjiyNMOn4DvXfoYHWlrUdymQ';

  useEffect(() => {
    axios.defaults.baseURL = 'https://autodev-partner.flarehr.com/benefits-plan/workplace-backend';
    axios.defaults.headers.common['X-PROFILE-ID'] = 'AP-C49ED307-1E59-431E-8A93-F92F786BB529';
    axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
    axios.defaults.params = { client: 'onboarding', source: 'Onboarding', channel: 'onboarding' };
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
      <style>{css.toString()}</style>

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

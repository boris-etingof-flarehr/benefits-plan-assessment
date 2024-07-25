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
  const accessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjYjQyNzQyYWU1OGY0ZGE0NjdiY2RhZWE0Yjk1YTI5ZmJhMGM1ZjkiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25fQXBvbGxvUHJvZmlsZXMiOiJBUC1DNDlFRDMwNy0xRTU5LTQzMUUtOEE5My1GOTJGNzg2QkI1MjkiLCJleHRlbnNpb25fVW5lc3RhYmxpc2hlZEFwb2xsb1Byb2ZpbGVzIjoiIiwiY3VzdG9tZXJJZCI6IjMzY2FhNGVhLTNiNmItNDJlYy1hODc5LWI2YjNkNjFkYWRkMCIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9mbGFyZS1hcHAtYXV0b2RldiIsImF1ZCI6ImZsYXJlLWFwcC1hdXRvZGV2IiwiYXV0aF90aW1lIjoxNzIxNzEyODgwLCJ1c2VyX2lkIjoiMzNjYWE0ZWEtM2I2Yi00MmVjLWE4NzktYjZiM2Q2MWRhZGQwIiwic3ViIjoiMzNjYWE0ZWEtM2I2Yi00MmVjLWE4NzktYjZiM2Q2MWRhZGQwIiwiaWF0IjoxNzIxODgzMzk5LCJleHAiOjE3MjE4ODY5OTksInBob25lX251bWJlciI6Iis2MTQwNjEzNTc2NCIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzYxNDA2MTM1NzY0Il19LCJzaWduX2luX3Byb3ZpZGVyIjoiY3VzdG9tIn19.NJFST9Q4jX5neHyGRglWPPuNqblx9cJxmPC6jdRJmyCJbXqJ0uOJwzXsECmokXwm_vlrqZE74wQynlM5M3EbCpapeGVCK2wln9pIYZepqhCFrXSfwd4zoclfzZX_AyhccTi1I20l9bGAWQq6y0MCTh2eekKaXiIEePowueGnKMPIgdfocOyFoIi1Nx9oAOKkRN3zccaqfPQ778w_k8eh9p-JFXLqambQlvhaAAOHYoS5LOZg38MXe4HviMNOfsb2RPUjreUos3shaAW50lmOrmSlzTUKGEX2cM3t3kI1iL-cWMUJHNrwfr8np3M9ZgJdCwZGkCSz0kdI6qTHTKdJag';

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

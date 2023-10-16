import { BackendApi } from '../services/backend-api';

type EventType = 'sign-up-viewed' | 'sign-up-completed';

const traceSignUpViewed = (): Promise<void> =>
  BackendApi.command({
    eventType: 'OfferViewed',
    offerName: 'Membership',
    data: {
      featureName: '',
      treatmentName: ''
    }
  });

const traceSignUpCompleted = (): Promise<void> =>
  BackendApi.command({
    eventType: 'OfferProgressed',
    offerName: 'Membership',
    data: {
      accepted: true,
      featureName: '',
      treatmentName: '',
      template: 'Eoi'
    }
  });

const trace = (event: EventType): Promise<void> => {
  switch (event) {
    case 'sign-up-viewed':
      return traceSignUpViewed();
    case 'sign-up-completed':
      return traceSignUpCompleted();
  }
};

const useTrace = (): { trace: typeof trace } => {
  return {
    trace
  };
};

export default useTrace;

import { BackendApi } from '../services/backend-api';
type Event =
  | 'sign-up-viewed'
  | 'sign-up-completed'
  | 'sign-up-declined'
  | {
      type: 'offer-viewed';
      offerName: string;
      data: {
        featureName: string;
        treatmentName: string;
      };
    }
  | {
      type: 'offer-accepted';
      offerName: string;
      data: { featureName: string; treatmentName: string } & (
        | {
            template: 'Eoi' | 'Simple';
          }
        | {
            template: 'Assessment';
            assessmentId: string;
          }
      );
    }
  | {
      type: 'offer-declined';
      offerName: string;
      data: { featureName: string; treatmentName: string } & (
        | {
            template: 'Eoi' | 'Simple';
          }
        | {
            template: 'Assessment';
            assessmentId: string;
          }
      );
    };

const traceSignUpViewed = (): Promise<void> =>
  BackendApi.command({
    eventType: 'OfferViewed',
    offerName: 'Membership',
    data: {
      featureName: '',
      treatmentName: ''
    }
  });

const traceSignUpCompleted = async (): Promise<void> => {
  await BackendApi.command({
    eventType: 'OfferProgressed',
    offerName: 'Membership',
    data: {
      accepted: true,
      featureName: '',
      treatmentName: '',
      template: 'Eoi'
    }
  });

  await BackendApi.command({
    eventType: 'CustomerRegistrationCompleted',
    isRegistered: true
  });
};

const traceSignUpDeclined = async (): Promise<void> => {
  await BackendApi.command({
    eventType: 'CustomerRegistrationCompleted',
    isRegistered: false
  });

  await BackendApi.command({
    eventType: 'OfferProgressed',
    offerName: 'Membership',
    data: {
      accepted: false,
      featureName: '',
      treatmentName: '',
      template: 'Eoi'
    }
  });
};

const trace = (event: Event): Promise<void> => {
  switch (true) {
    case event === 'sign-up-viewed':
      return traceSignUpViewed();
    case event === 'sign-up-completed':
      return traceSignUpCompleted();
    case event === 'sign-up-declined':
      return traceSignUpDeclined();
    case typeof event === 'object' && event.type === 'offer-viewed':
      return BackendApi.command({
        ...event,
        eventType: 'OfferViewed'
      });
    case typeof event === 'object' && event.type === 'offer-accepted':
      return BackendApi.command({
        eventType: 'OfferProgressed',
        offerName: event.offerName,
        data: {
          ...event.data,
          accepted: true
        }
      });
    case typeof event === 'object' && event.type === 'offer-declined':
      return BackendApi.command({
        eventType: 'OfferProgressed',
        offerName: event.offerName,
        data: {
          ...event.data,
          accepted: false
        }
      });
  }

  return Promise.resolve();
};

const useTrace = (): { trace: typeof trace } => {
  return {
    trace
  };
};

export default useTrace;

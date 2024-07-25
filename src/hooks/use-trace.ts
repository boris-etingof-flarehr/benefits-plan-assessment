const benefitsOnboardingApi = { backend: { command: (obj: any) => Promise.resolve() } };

type Event =
  | 'started'
  | 'membership-accepted'
  | 'membership-declined'
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
            template: 'Eoi';
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
            template: 'Eoi';
          }
        | {
            template: 'Assessment';
            assessmentId: string;
          }
      );
    }
  | {
      type: 'offer-progressed';
      offerName: string;
      data: { featureName: string; treatmentName: string; template: 'Simple' };
    }
  | {
      type: 'assessment-viewed';
      data: {
        assessmentId: string;
        assessmentTitle: string;
      };
    }
  | {
      type: 'assessment-skipped';
      data: {
        assessmentId: string;
        assessmentTitle: string;
      };
    }
  | {
      type: 'assessment-field-updated';
      data: {
        assessmentId: string;
        assessmentTitle: string;
        customerAttribute: string;
      };
    }
  | {
      type: 'assessment-submitted';
      data: {
        assessmentId: string;
        assessmentTitle: string;
      };
    }
  | {
      type: 'assessment-summary-viewed';
      data: {
        assessmentId: string;
        assessmentTitle: string;
      };
    }
  | {
      type: 'summary-viewed';
      data: {
        summaryVariant: 'app' | 'generic';
      };
    }
  | 'completed';

const traceSignUpViewed = (): Promise<void> =>
  benefitsOnboardingApi.backend.command({
    eventType: 'OfferViewed',
    offerName: 'Membership',
    data: {
      featureName: '',
      treatmentName: ''
    }
  });

const traceSignUpCompleted = async (): Promise<void> => {
  await benefitsOnboardingApi.backend.command({
    eventType: 'OfferProgressed',
    offerName: 'Membership',
    data: {
      accepted: true,
      featureName: '',
      treatmentName: '',
      template: 'Eoi'
    }
  });

  await benefitsOnboardingApi.backend.command({
    eventType: 'CustomerRegistrationCompleted',
    isRegistered: true
  });
};

const traceSignUpDeclined = async (): Promise<void> => {
  await benefitsOnboardingApi.backend.command({
    eventType: 'CustomerRegistrationCompleted',
    isRegistered: false
  });

  await benefitsOnboardingApi.backend.command({
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
  return Promise.resolve();
};

const useTrace = (): { trace: typeof trace } => {
  return {
    trace
  };
};

export default useTrace;

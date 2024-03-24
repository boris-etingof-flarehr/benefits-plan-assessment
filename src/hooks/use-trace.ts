import { benefitsOnboardingApi } from '../services';
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
  switch (true) {
    case event === 'started':
      return benefitsOnboardingApi.backend.command({ eventType: 'Started' });
    case event === 'membership-accepted':
      return benefitsOnboardingApi.backend.command({
        eventType: 'OfferProgressed',
        offerName: 'Membership',
        data: {
          accepted: true,
          featureName: '',
          treatmentName: '',
          template: 'Eoi'
        }
      });
    case event === 'membership-declined':
      return benefitsOnboardingApi.backend.command({
        eventType: 'OfferProgressed',
        offerName: 'Membership',
        data: {
          accepted: false,
          featureName: '',
          treatmentName: '',
          template: 'Eoi'
        }
      });
    case event === 'sign-up-viewed':
      return traceSignUpViewed();
    case event === 'sign-up-completed':
      return traceSignUpCompleted();
    case event === 'sign-up-declined':
      return traceSignUpDeclined();
    case typeof event === 'object' && event.type === 'offer-viewed':
      return benefitsOnboardingApi.backend.command({
        ...event,
        eventType: 'OfferViewed'
      });
    case typeof event === 'object' && event.type === 'offer-accepted':
      return benefitsOnboardingApi.backend.command({
        eventType: 'OfferProgressed',
        offerName: event.offerName,
        data: {
          ...event.data,
          accepted: true
        }
      });
    case typeof event === 'object' && event.type === 'offer-declined':
      return benefitsOnboardingApi.backend.command({
        eventType: 'OfferProgressed',
        offerName: event.offerName,
        data: {
          ...event.data,
          accepted: false
        }
      });
    case typeof event === 'object' && event.type === 'offer-progressed':
      return benefitsOnboardingApi.backend.command({
        eventType: 'OfferProgressed',
        offerName: event.offerName,
        data: event.data
      });
    case typeof event === 'object' && event.type === 'assessment-viewed':
      return benefitsOnboardingApi.workplaceBackend.track('Assessment Viewed', {
        id: event.data.assessmentId,
        name: event.data.assessmentTitle
      }) as unknown as Promise<void>;
    case typeof event === 'object' && event.type === 'assessment-skipped':
      return benefitsOnboardingApi.workplaceBackend.track('Assessment Skipped', {
        id: event.data.assessmentId,
        name: event.data.assessmentTitle
      }) as unknown as Promise<void>;
    case typeof event === 'object' && event.type === 'assessment-field-updated':
      return benefitsOnboardingApi.workplaceBackend.track('AssessmentField Updated', {
        id: event.data.assessmentId,
        name: event.data.assessmentTitle,
        attribute: event.data.customerAttribute
      }) as unknown as Promise<void>;
    case typeof event === 'object' && event.type === 'assessment-submitted':
      return benefitsOnboardingApi.workplaceBackend.track('Assessment Submitted', {
        id: event.data.assessmentId,
        name: event.data.assessmentTitle
      }) as unknown as Promise<void>;
    case typeof event === 'object' && event.type === 'assessment-summary-viewed':
      return benefitsOnboardingApi.workplaceBackend.track('AssessmentSummary Viewed', {
        id: event.data.assessmentId,
        name: event.data.assessmentTitle
      }) as unknown as Promise<void>;
    case typeof event === 'object' && event.type === 'summary-viewed':
      return benefitsOnboardingApi.backend.command({
        eventType: 'SummaryViewed',
        summaryVariant: event.data.summaryVariant
      });
    case event === 'completed':
      return benefitsOnboardingApi.backend.command({ eventType: 'Completed' });
  }

  return Promise.resolve();
};

const useTrace = (): { trace: typeof trace } => {
  return {
    trace
  };
};

export default useTrace;

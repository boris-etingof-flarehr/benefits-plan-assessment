import axios from 'axios';
import { MarketplaceOffer, MarketplaceOfferName, OfferMetadata } from 'src/app.model';

export type InitResponse = {
  offers: MarketplaceOffer[];
  isComplete: boolean;
  identity: {
    email: string;
    phoneNumber?: string;
    verifiedPhoneNumber?: string;
    isRegistered: boolean;
  };
  workplace: {
    employerName: string;
    isLinkedWithIdentity: boolean;
  };
  featureFlags: {
    unifiedCustomerRegistration: boolean;
  };
};

type OfferTemplateData = {
  template: 'Assessment';
  accepted: boolean;
  assessmentId: string;
};

type OfferViewed = {
  offerName: MarketplaceOfferName;
  eventType: 'OfferViewed';
  data: OfferMetadata;
};

type OfferProgressed = {
  offerName: MarketplaceOfferName;
  eventType: 'OfferProgressed';
  data: OfferMetadata & OfferTemplateData;
};

type CommandDto = OfferViewed | OfferProgressed;

type Event =
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
      data: { featureName: string; treatmentName: string } & {
        template: 'Assessment';
        assessmentId: string;
      };
    }
  | {
      type: 'offer-declined';
      offerName: string;
      data: { featureName: string; treatmentName: string } & {
        template: 'Assessment';
        assessmentId: string;
      };
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
    };

const track = async (event: string, properties: Record<string, string>): Promise<void> => {
  axios
    .post('/v1.0/analytics/track', {
      event,
      properties
    })
    .catch((_) => {});
};

const command = async (event: CommandDto, source?: string, sourceId?: string): Promise<void> => {
  axios.post('/command', { ...event, source, sourceId });
};

const trace = (event: Event, source?: string, sourceId?: string): Promise<void> => {
  switch (true) {
    case typeof event === 'object' && event.type === 'offer-viewed':
      return command(
        {
          ...event,
          eventType: 'OfferViewed'
        },
        source,
        sourceId
      );
    case typeof event === 'object' && event.type === 'offer-accepted':
      return command(
        {
          eventType: 'OfferProgressed',
          offerName: event.offerName,
          data: {
            ...event.data,
            accepted: true
          }
        },
        source,
        sourceId
      );
    case typeof event === 'object' && event.type === 'offer-declined':
      return command(
        {
          eventType: 'OfferProgressed',
          offerName: event.offerName,
          data: {
            ...event.data,
            accepted: false
          }
        },
        source,
        sourceId
      );
    case typeof event === 'object' && event.type === 'assessment-viewed':
      return track('Assessment Viewed', {
        id: event.data.assessmentId,
        name: event.data.assessmentTitle
      }) as unknown as Promise<void>;
    case typeof event === 'object' && event.type === 'assessment-skipped':
      return track('Assessment Skipped', {
        id: event.data.assessmentId,
        name: event.data.assessmentTitle
      }) as unknown as Promise<void>;
    case typeof event === 'object' && event.type === 'assessment-field-updated':
      return track('AssessmentField Updated', {
        id: event.data.assessmentId,
        name: event.data.assessmentTitle,
        attribute: event.data.customerAttribute
      }) as unknown as Promise<void>;
    case typeof event === 'object' && event.type === 'assessment-submitted':
      return track('Assessment Submitted', {
        id: event.data.assessmentId,
        name: event.data.assessmentTitle
      }) as unknown as Promise<void>;
    case typeof event === 'object' && event.type === 'assessment-summary-viewed':
      return track('AssessmentSummary Viewed', {
        id: event.data.assessmentId,
        name: event.data.assessmentTitle
      }) as unknown as Promise<void>;
  }

  return Promise.resolve();
};

const useTrace = (): { trace: typeof trace } => {
  return {
    trace
  };
};

export default useTrace;

import axios, { AxiosError, AxiosInstance } from 'axios';

import { MarketplaceOffer, MarketplaceOfferName, OfferMetadata } from '../app.model';
import reloadEvent from '../utils/reload-event';

export type InitResponse = {
  offers: MarketplaceOffer[];
  isComplete: boolean;
  identity: {
    email: string;
    phoneNumber?: string;
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

type OfferTemplateData =
  | {
      template: 'Simple';
    }
  | {
      template: 'Eoi';
      accepted: boolean;
    }
  | {
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

type Started = {
  eventType: 'Started';
};

type CustomerRegistrationCompleted = {
  eventType: 'CustomerRegistrationCompleted';
  isRegistered: boolean;
}

type Completed = {
  eventType: 'Completed';
};

type SummaryViewed = {
  eventType: 'SummaryViewed';
  summaryVariant: 'app' | 'generic';
};

type CommandDto = Started | CustomerRegistrationCompleted | OfferViewed | OfferProgressed | SummaryViewed | Completed;

// eslint-disable-next-line no-unused-vars
enum ErrorCode {
  // eslint-disable-next-line no-unused-vars
  Auth_SessionExpired
}

const onError = (ex: AxiosError): void => {
  if ((ex.response?.data as { code: keyof typeof ErrorCode })?.code === 'Auth_SessionExpired') {
    reloadEvent.dispatch();
  }
  throw ex;
};

export class BackendApi {
  private static sourceId: string;
  private static axiosInstance: AxiosInstance;

  static initClient(baseUrl: string, headers: Record<string, string>, sourceId: string): void {
    this.axiosInstance = axios.create({
      baseURL: `${baseUrl}/benefits-onboarding/backend`,
      headers
    });
    this.axiosInstance.interceptors.response.use((res) => res, onError);
    this.sourceId = sourceId;
  }

  static GetClient = (): AxiosInstance => BackendApi.axiosInstance;

  static async init(): Promise<InitResponse> {
    const response = await this.axiosInstance.post('/init', {
      source: 'Onboarding',
      sourceId: this.sourceId
    });

    return response.data as InitResponse;
  }

  static async command(event: CommandDto): Promise<void> {
    await this.axiosInstance.post('/command', {
      source: 'Onboarding',
      sourceId: this.sourceId,
      ...event
    });
  }
}

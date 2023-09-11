import axios, { AxiosInstance } from 'axios';

import { MarketplaceOffer, MarketplaceOfferName, OfferMetadata } from '../app.model';

export type InitResponse = {
  offers: MarketplaceOffer[];
  employerName: string;
  email: string;
  isComplete: boolean;
  flareAppIdentity?: {
    maskedPhoneNumber: string;
    apolloProfileLinked: boolean;
  };
};

type OfferTemplateData =
  | {
      template: 'Simple';
    }
  | {
      template: 'Eoi';
      accepted: boolean;
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

type Completed = {
  eventType: 'Completed';
};

type SummaryViewed = {
  eventType: 'SummaryViewed';
  summaryVariant: 'app' | 'generic';
};

type CommandDto = Started | OfferViewed | OfferProgressed | SummaryViewed | Completed;

export class BackendApi {
  private static sourceId: string;
  private static axiosInstance: AxiosInstance;

  static initClient(baseUrl: string, accessToken: string, sourceId: string): void {
    this.axiosInstance = axios.create({
      baseURL: `${baseUrl}/benefits-onboarding/backend`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // Uncomment below for local dev against local backend
        // 'x-partner-id': '123',
        // 'x-account-id': '83A9F426-8E73-4781-B6CA-ABC374510C54',
        // 'x-profile-id': 'AP-C14DF031-A764-40B2-87C0-77884F4BD303'
      }
    });
    this.sourceId = sourceId;
  }

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

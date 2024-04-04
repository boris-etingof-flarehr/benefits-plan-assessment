import { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { MarketplaceOffer, MarketplaceOfferName, OfferMetadata } from '../app.model';
import reloadEvent from '../utils/reload-event';
import { BackendApiBase } from './backend-api';
import { WorkplaceBackendApiBase } from './workplace-backend-api';

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
};

type Completed = {
  eventType: 'Completed';
};

type SummaryViewed = {
  eventType: 'SummaryViewed';
  summaryVariant: 'app' | 'generic';
};

type CommandDto =
  | Started
  | CustomerRegistrationCompleted
  | OfferViewed
  | OfferProgressed
  | SummaryViewed
  | Completed;

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

export class Backend extends BackendApiBase {
  protected url(baseUrl: string): string {
    return `${baseUrl}/benefits-onboarding`;
  }
  private sourceId: string | undefined;

  initClient(baseUrl: string, headers: Record<string, string>, sourceId?: string): void {
    super.initClient(baseUrl, headers);

    this.getClient().interceptors.response.use((res) => res, onError);
    this.sourceId = sourceId;
  }

  async init(): Promise<InitResponse> {
    return this.getClient()
      .post<InitResponse>('/init', {
        source: 'Onboarding',
        sourceId: this.sourceId
      })
      .then((res) => res.data);
  }

  async command(event: CommandDto): Promise<void> {
    await this.getClient().post('/command', {
      source: 'Onboarding',
      sourceId: this.sourceId,
      ...event
    });
  }
}

class WorkplaceBackend extends WorkplaceBackendApiBase {
  private _canceledSignal: AbortSignal | undefined;

  get canceledSignal(): AbortSignal {
    if (!this._canceledSignal) {
      const abortController = new AbortController();

      abortController.abort();

      this._canceledSignal = abortController.signal;
    }
    return this._canceledSignal;
  }

  #analyticsTrackInterceptor = async (
    req: InternalAxiosRequestConfig<unknown>
  ): Promise<InternalAxiosRequestConfig<unknown>> => {
    // Cancel requests to /analytics/track when dev, as it's defined in APIM.
    if (import.meta.env.DEV && req.url?.endsWith('/analytics/track')) {
      console.log(`Segment event name: ${(req.data as Record<string, unknown>)?.event}`);
      console.log(`Segment event properties:`);
      console.table((req.data as Record<string, unknown>)?.properties);

      req.signal = this.canceledSignal;
    }

    return req;
  };

  url(baseUrl: string): string {
    return `${baseUrl}/benefits-onboarding`;
  }

  override initClient(baseUrl: string, profileId: string, headers: Record<string, string>): void {
    super.initClient(baseUrl, profileId, headers);

    this.getClient().interceptors.request.use(this.#analyticsTrackInterceptor);
  }

  async track(event: string, properties: Record<string, string>): Promise<void> {
    await this.getClient()
      .post('/v1.0/analytics/track', {
        event,
        properties
      })
      .catch((_) => {});
  }
}

export const benefitsOnboardingApi = {
  backend: new Backend(),
  workplaceBackend: new WorkplaceBackend()
};

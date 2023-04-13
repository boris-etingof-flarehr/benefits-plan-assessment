import axios, { AxiosInstance } from 'axios';

export type Step = 'Perks' | 'SalaryPackaging' | 'HealthInsurance' | 'Boosts';

export type EventType =
  | 'Start'
  | 'StartPerks'
  | 'StartBoosts'
  | 'StartSalaryPackaging'
  | 'StartHealthInsurance'
  | 'ViewSummary'
  | 'Complete';

type StepProgressEventType =
  | { name: 'ProgressSalaryPackaging'; accepted: boolean }
  | { name: 'ProgressHealthInsurance'; accepted: boolean }
  | { name: 'ProgressPerks'; accepted: boolean }
  | { name: 'ProgressBoosts'; accepted: boolean };

export type CommandEventType = { name: EventType } | StepProgressEventType;

export interface Content {
  template: 'Eoi' | 'Simple';
  title: string;
  description: string;
  details: string[];
  imageUrl: string;
  mobileImageUrl: string;
  acceptButton: string;
  declineButton?: string;
  terms: string[];
}

interface OfferMetadata {
  featureName: string;
  treatmentName: string;
}

export interface MarketplaceOffer {
  name: Step;
  content: Content;
  metadata: OfferMetadata;
}

export interface InitResponse {
  offers: MarketplaceOffer[];
  employerName: string;
  email: string;
  isComplete: boolean;
}

export class BackendApi {
  private static sourceId: string;
  private static axiosInstance: AxiosInstance;

  static initClient(baseUrl: string, accessToken: string, sourceId: string): void {
    this.axiosInstance = axios.create({
      baseURL: `${baseUrl}/benefits-onboarding/backend`,
      headers: {
        Authorization: `Bearer ${accessToken}`
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

  static async command(eventType: CommandEventType): Promise<void> {
    function isStepProgressEventType(
      eventType: CommandEventType
    ): eventType is StepProgressEventType {
      return 'accepted' in eventType;
    }

    await this.axiosInstance.post('/command', {
      source: 'Onboarding',
      sourceId: this.sourceId,
      eventType: eventType.name,
      accepted: isStepProgressEventType(eventType) && eventType.accepted
    });
  }

  static async stepProgressCommand(step: Step, accepted: boolean): Promise<void> {
    const stepCommands: Record<Step, CommandEventType> = {
      Perks: { name: 'ProgressPerks', accepted },
      SalaryPackaging: { name: 'ProgressSalaryPackaging', accepted },
      HealthInsurance: { name: 'ProgressHealthInsurance', accepted },
      Boosts: { name: 'ProgressBoosts', accepted }
    };

    const command = stepCommands[step];
    if (command) {
      await this.command(command);
    }
    return;
  }
}

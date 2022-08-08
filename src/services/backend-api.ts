import axios, { AxiosInstance } from 'axios';

export type Step = 'Perks' | 'Boosts' | 'SalaryPackaging';

export interface InitResponse {
  configuredSteps: Step[];
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

  static async command(
    eventType:
      | {
          name: 'Start' | 'ProgressPerks' | 'ProgressBoosts' | 'Complete';
        }
      | { name: 'ProgressSalaryPackaging'; accepted: boolean }
  ): Promise<void> {
    await this.axiosInstance.post('/command', {
      source: 'Onboarding',
      sourceId: this.sourceId,
      eventType: eventType.name,
      accepted: eventType.name === 'ProgressSalaryPackaging' && eventType.accepted
    });
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    'benefits-plan-assessment': {
      'base-url': string;
      'profile-id': string;
      'access-token': string;
      'image-url': string;
      'assessment-id': string;
      'track-client': string;
      'track-source': string;
      'track-source-id': string;
      'track-channel': string;
      'metadata-feature-name': string;
      'metadata-treatment-name': string;
      title?: string;
      description?: string;
      'accept-button'?: string;
      'decline-button'?: string;
      'step-number-current'?: string;
      'step-number-total'?: string;
      'vertical-alignment'?: string;
      'skip-intro'?: string;
      terms?: string[];
      details?: string[];
      onAccepted?: () => Promise<void>;
      onDeclined?: () => Promise<void>;
      onComplete?: () => void;
    };
  }
}

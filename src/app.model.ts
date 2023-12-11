export type AppContextData = {
  offers: MarketplaceOffer[];
  isComplete: boolean;
  isAppEnabled: boolean;
  identity: CustomerIdentity;
  workplace: Workplace;
  featureFlags: FeatureFlags;
  updateIdentity: (_authenticated: boolean) => void;
};

export type FeatureFlags = {
  unifiedCustomerRegistration: boolean;
};

export type WorkplaceLinkingStatus = 'Unlinked' | 'PreviouslyLinked' | 'NewlyLinked';

export type Workplace = {
  employerName: string;
  linkingStatus: WorkplaceLinkingStatus;
};

export type CustomerRegistrationStatus =
  | 'Unregistered'
  | 'PreviouslyRegistered'
  | 'NewlyRegistered'
  | 'RegistrationAbandoned';

export type CustomerIdentity = {
  email: string;
  phoneNumber: string;
  registrationStatus: CustomerRegistrationStatus;
};

export type MarketplaceOfferName = string;

export interface MarketplaceOffer {
  name: MarketplaceOfferName;
  content: Content;
  metadata: OfferMetadata;
}

type Template = 'Eoi' | 'Simple';

export type Content = {
  template: Template;
  title: string;
  description: string;
  details: string[];
  imageUrl: string;
  mobileImageUrl: string;
  acceptButton: string;
  declineButton?: string;
  terms: string[];
};

export type OfferMetadata = {
  featureName: string;
  treatmentName: string;
};

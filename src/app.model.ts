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
  verifiedPhoneNumber: string;
  registrationStatus: CustomerRegistrationStatus;
};

export type MarketplaceOfferName = string;

export type MarketplaceOfferT<TContent extends SimpleContent | EoiContent | AssessmentContent> = {
  name: MarketplaceOfferName;
  content: TContent;
  metadata: OfferMetadata;
};

export type MarketplaceOffer = MarketplaceOfferT<SimpleContent | EoiContent | AssessmentContent>;

interface IContent {
  title: string;
  description: string;
  details: string[];
  imageUrl: string;
  mobileImageUrl: string;
  acceptButton: string;
  terms: string[];
}

interface SimpleContent extends IContent {
  template: 'Simple';
}

interface EoiContent extends IContent {
  template: 'Eoi';
  declineButton: string;
}

export interface AssessmentContent extends IContent {
  template: 'Assessment';
  assessmentId: string;
  declineButton: string;
}

export type OfferMetadata = {
  featureName: string;
  treatmentName: string;
};

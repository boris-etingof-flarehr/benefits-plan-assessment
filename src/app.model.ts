export type AppContextData = {
  offers: MarketplaceOffer[];
  employerName: string;
  email: string;
  isComplete: boolean;
};

export type MarketplaceOfferName =
  | 'Membership'
  | 'Perks'
  | 'SalaryPackaging'
  | 'SalaryPackagingDevices'
  | 'HealthInsurance'
  | 'Boosts'
  | 'Energy';

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

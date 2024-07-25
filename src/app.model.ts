
export type MarketplaceOfferName = string;

export type MarketplaceOfferT<TContent extends AssessmentContent> = {
  name: MarketplaceOfferName;
  content: TContent;
  metadata: OfferMetadata;
};

export type MarketplaceOffer = MarketplaceOfferT<AssessmentContent>;

interface IContent {
  title: string;
  description: string;
  details: string[];
  imageUrl: string;
  mobileImageUrl: string;
  acceptButton: string;
  terms: string[];
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

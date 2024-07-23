import { useMemo, useState } from 'preact/hooks';

import {
  CustomerIdentity,
  FeatureFlags,
  MarketplaceOffer,
  MarketplaceOfferName,
  Workplace
} from '../app.model';

type AppScreen =
  | {
      screenName: 'Introduction' | 'FlareAppIdentity' | 'SummaryApp' | 'SummaryGeneric';
    }
  | {
      screenName: 'MarketplaceOffer';
      offerName: MarketplaceOfferName;
    };

type InternalAppScreenName =
  | 'Introduction'
  | 'FlareAppIdentity'
  | MarketplaceOfferName
  | 'SummaryApp'
  | 'SummaryGeneric';

export function useNavigation(
  offers: MarketplaceOffer[],
  isComplete: boolean,
  isAppEnabled: boolean,
  identity: CustomerIdentity,
  workplace: Workplace,
  featureFlags: FeatureFlags
): {
  current: AppScreen;
  goNext: () => void;
} {
  const screenNames = getScreenNames(
    offers,
    isComplete,
    isAppEnabled,
    identity,
    workplace,
    featureFlags
  );
  const [currentScreen, setCurrentScreen] = useState<InternalAppScreenName>(screenNames[0]);
  const current = useMemo<AppScreen>(() => {
    const offer = offers.find((o) => o.name === currentScreen);

    return offer
      ? {
          screenName: 'MarketplaceOffer',
          offerName: offer.name
        }
      : ({
          screenName: currentScreen
        } as AppScreen);
  }, [currentScreen, offers]);

  const goNext = (): void => {
    try {
      const currentScreenIndex = screenNames.findIndex((o) => o === currentScreen);
      const nextScreen = screenNames[currentScreenIndex + 1];
      setCurrentScreen(nextScreen);
    } catch {
      // Last step already
    }
  };

  if (!screenNames.some((o) => o === currentScreen)) {
    setCurrentScreen(screenNames[0]);
  }

  return {
    current,
    goNext
  };
}

function getScreenNames(
  offers: MarketplaceOffer[],
  isComplete: boolean,
  isAppEnabled: boolean,
  identity: CustomerIdentity,
  workplace: Workplace,
  featureFlags: FeatureFlags
): InternalAppScreenName[] {
  const { unifiedCustomerRegistration: isUnifiedCustomerRegistrationEnabled } = featureFlags;

  const finalScreen: InternalAppScreenName = isAppEnabled ? 'SummaryApp' : 'SummaryGeneric';

  if (isComplete) {
    return [finalScreen];
  }

  if (!isUnifiedCustomerRegistrationEnabled) {
    return ['Introduction', ...offers.map((o) => o.name), finalScreen];
  }

  switch (true) {
    case workplace.linkingStatus === 'PreviouslyLinked':
      return ['Introduction', 'SummaryGeneric'];
    case identity.registrationStatus === 'Unregistered':
      return ['Introduction', 'FlareAppIdentity'];
    case identity.registrationStatus === 'PreviouslyRegistered' &&
      workplace.linkingStatus === 'Unlinked':
      return ['Introduction', 'FlareAppIdentity'];
    case identity.registrationStatus === 'PreviouslyRegistered':
    case identity.registrationStatus === 'NewlyRegistered':
      return [...offers.map((o) => o.name), finalScreen];
    case identity.registrationStatus === 'RegistrationAbandoned':
      return [finalScreen];
    default:
      return [];
  }
}

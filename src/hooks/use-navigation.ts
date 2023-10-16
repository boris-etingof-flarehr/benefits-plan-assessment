import { useMemo, useState } from 'preact/hooks';

import {
  FeatureFlags,
  FlareAppIdentity,
  MarketplaceOffer,
  MarketplaceOfferName
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
  flareAppIdentity: FlareAppIdentity,
  featureFlags: FeatureFlags
): {
  current: AppScreen;
  goNext: () => void;
} {
  const screenNames = getScreenNames(
    offers,
    isComplete,
    isAppEnabled,
    flareAppIdentity,
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

  return {
    current,
    goNext
  };
}

function getScreenNames(
  offers: MarketplaceOffer[],
  isComplete: boolean,
  isAppEnabled: boolean,
  flareAppIdentity: FlareAppIdentity,
  featureFlags: FeatureFlags
): InternalAppScreenName[] {
  const finalScreen: InternalAppScreenName = isAppEnabled ? 'SummaryApp' : 'SummaryGeneric';

  switch (true) {
    case isComplete:
      return [finalScreen];
    case featureFlags.flareAppIdentity &&
      flareAppIdentity.status === 'RegisteredAndWorkplaceLinked':
      return ['Introduction', 'SummaryGeneric'];
    case featureFlags.flareAppIdentity && flareAppIdentity.status === 'Unregistered':
      return ['Introduction', 'FlareAppIdentity', ...offers.map((o) => o.name), finalScreen];
    case featureFlags.flareAppIdentity &&
      flareAppIdentity.status === 'RegisteredButNotWorkplaceLinked':
      return ['Introduction', 'FlareAppIdentity', finalScreen];
    default:
      return ['Introduction', ...offers.map((o) => o.name), finalScreen];
  }
}

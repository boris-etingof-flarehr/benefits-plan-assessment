import { useMemo, useState } from 'preact/hooks';

import { FlareAppIdentity, MarketplaceOffer, MarketplaceOfferName } from '../app.model';

type AppScreen =
  | {
      screenName: 'Introduction' | 'SummaryApp' | 'SummaryGeneric';
    }
  | {
      screenName: 'MarketplaceOffer';
      offerName: MarketplaceOfferName;
    };

type InternalAppScreenName =
  | 'Introduction'
  | MarketplaceOfferName
  | 'SummaryApp'
  | 'SummaryGeneric';

export function useNavigation(
  offers: MarketplaceOffer[],
  isComplete: boolean,
  isAppEnabled: boolean,
  flareAppIdentity: FlareAppIdentity
): {
  current: AppScreen;
  goNext: () => void;
} {
  const screenNames = getScreenNames(offers, isComplete, isAppEnabled, flareAppIdentity);
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
  flareAppIdentity: FlareAppIdentity
): InternalAppScreenName[] {
  const finalScreen: InternalAppScreenName = isAppEnabled ? 'SummaryApp' : 'SummaryGeneric';

  switch (true) {
    case isComplete:
      return [finalScreen];
    case flareAppIdentity.status === 'RegisteredAndWorkplaceLinked':
      return ['Introduction', 'SummaryGeneric'];
    default:
      return ['Introduction', ...offers.map((o) => o.name), finalScreen];
  }
}

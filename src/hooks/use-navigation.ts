import { useState } from 'preact/hooks';

import { FlareAppIdentity, MarketplaceOffer, MarketplaceOfferName } from '../app.model';

export type AppScreen = 'Introduction' | MarketplaceOfferName | 'SummaryApp' | 'SummaryGeneric';

export function useNavigation(
  offers: MarketplaceOffer[],
  isComplete: boolean,
  isAppEnabled: boolean,
  flareAppIdentity: FlareAppIdentity
): {
  currentScreen: AppScreen;
  goNext: () => void;
} {
  const screenNames = getScreenNames(offers, isComplete, isAppEnabled, flareAppIdentity);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(screenNames[0]);

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
    currentScreen,
    goNext
  };
}

function getScreenNames(
  offers: MarketplaceOffer[],
  isComplete: boolean,
  isAppEnabled: boolean,
  flareAppIdentity: FlareAppIdentity
): AppScreen[] {
  const finalScreen: AppScreen = isAppEnabled ? 'SummaryApp' : 'SummaryGeneric';

  switch (true) {
    case isComplete:
      return [finalScreen];
    case flareAppIdentity.status === 'RegisteredAndWorkplaceLinked':
      return ['Introduction', 'SummaryGeneric'];
    default:
      return ['Introduction', ...offers.map((o) => o.name), finalScreen];
  }
}

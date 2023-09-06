import { useState } from 'preact/hooks';

import { MarketplaceOffer, MarketplaceOfferName } from '../app.model';

export type AppScreen = 'Introduction' | MarketplaceOfferName | 'SummaryApp' | 'SummaryGeneric';

export function useNavigation(
  offers: MarketplaceOffer[],
  isComplete: boolean
): {
  currentScreen?: AppScreen;
  goNext: () => void;
} {
  const finalScreen: AppScreen = isAppEnabled(offers) ? 'SummaryApp' : 'SummaryGeneric';

  const screenNames: AppScreen[] = isComplete
    ? [finalScreen]
    : ['Introduction', ...offers.map((o) => o.name), finalScreen];

  const [currentScreen, setCurrentScreen] = useState<AppScreen>();

  const goNext = (): void => {
    if (currentScreen === undefined) {
      setCurrentScreen(screenNames[0]);
    } else {
      try {
        const currentScreenIndex = screenNames.findIndex((o) => o === currentScreen);
        const nextScreen = screenNames[currentScreenIndex + 1];
        setCurrentScreen(nextScreen);
      } catch {
        // Last step already
      }
    }
  };

  return {
    currentScreen,
    goNext
  };
}

function isAppEnabled(offers: MarketplaceOffer[]): boolean {
  return offers.some((offer) => offer.name === 'Perks');
}

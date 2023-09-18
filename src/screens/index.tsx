import { FunctionalComponent } from 'preact';
import { useContext } from 'preact/hooks';

import { AppContext } from '../context/app-context';
import { useNavigation } from '../hooks/use-navigation';
import Introduction from './introduction';
import MarketPlaceOffer from './marketplace-offer';
import SummaryApp from './summary-app';
import SummaryGeneric from './summary-generic';

const Screen: FunctionalComponent = () => {
  const { employerName, email, offers, isComplete, isAppEnabled, flareAppIdentity } =
    useContext(AppContext);
  const { current, goNext } = useNavigation(
    offers,
    isComplete,
    isAppEnabled,
    flareAppIdentity
  );

  switch (current.screenName) {
    case 'Introduction':
      return <Introduction employerName={employerName} onStepComplete={goNext} />;
    case 'MarketplaceOffer':
      return (
        <MarketPlaceOffer
          stepNumber={{
            current: offers.findIndex((o) => o.name === current.offerName) + 1,
            total: offers.length
          }}
          marketPlaceOffer={offers.find((o) => o.name === current.offerName)!}
          onStepComplete={goNext}
        />
      );
    case 'SummaryApp':
      return <SummaryApp email={email} />;
    case 'SummaryGeneric':
      return <SummaryGeneric />;
    default:
      return <></>;
  }
};

export default Screen;

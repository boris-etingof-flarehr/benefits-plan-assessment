import { FunctionalComponent } from 'preact';
import { useCallback, useContext } from 'preact/hooks';

import { AppContext } from '../context/app-context';
import { useNavigation } from '../hooks/use-navigation';
import FlareAppIdentity from './flare-app-identity';
import Introduction from './introduction';
import MarketPlaceOffer from './marketplace-offer';
import SummaryApp from './summary-app';
import SummaryGeneric from './summary-generic';

const Screen: FunctionalComponent = () => {
  const {
    offers,
    isComplete,
    isAppEnabled,
    identity,
    workplace,
    featureFlags,
    updateIdentity
  } = useContext(AppContext);
  const { current, goNext } = useNavigation(
    offers,
    isComplete,
    isAppEnabled,
    identity,
    workplace,
    featureFlags
  );

  const onSuccess = useCallback((): void => {
    updateIdentity(true);
  }, [updateIdentity]);

  const onDecline = useCallback((): void => {
    updateIdentity(false);
  }, [updateIdentity]);

  switch (current.screenName) {
    case 'Introduction':
      return <Introduction employerName={workplace.employerName} onStepComplete={goNext} />;
    case 'FlareAppIdentity':
      return <FlareAppIdentity onSuccess={onSuccess} onDecline={onDecline} />;
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
      return <SummaryApp />;
    case 'SummaryGeneric':
      return <SummaryGeneric />;
    default:
      return <></>;
  }
};

export default Screen;

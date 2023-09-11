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
  const { currentScreen, goNext } = useNavigation(
    offers,
    isComplete,
    isAppEnabled,
    flareAppIdentity
  );

  switch (currentScreen) {
    case 'Introduction':
      return <Introduction employerName={employerName} onStepComplete={goNext} />;
    case 'SalaryPackaging':
    case 'SalaryPackagingDevices':
    case 'HealthInsurance':
    case 'Boosts':
    case 'Perks':
    case 'Energy':
      return (
        <MarketPlaceOffer
          stepNumber={{
            current: offers.findIndex((o) => o.name === currentScreen) + 1,
            total: offers.length
          }}
          marketPlaceOffer={offers.find((o) => o.name === currentScreen)!}
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

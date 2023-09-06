import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { AppContextData } from './app.model';
import Loader from './components/loader';
import { AppContext } from './context/app-context';
import { useNavigation } from './hooks/use-navigation';
import css from './index.css';
import Introduction from './screens/introduction';
import MarketPlaceOffer from './screens/marketplace-offer';
import SummaryApp from './screens/summary-app';
import SummaryGeneric from './screens/summary-generic';
import { BackendApi } from './services/backend-api';

interface Props {
  ['backend-url']: string;
  ['access-token']: string;
  ['workflows-instance-id']: string;
}

const App: FunctionalComponent<Props> = (props) => {
  const [initialized, setInitialized] = useState(false);

  const [appContext, setAppContext] = useState<AppContextData>({
    offers: [],
    employerName: '',
    email: '',
    isComplete: false
  });

  const { currentScreen, goNext } = useNavigation(appContext.offers, appContext.isComplete);

  useEffect(() => {
    (async (): Promise<void> => {
      const config = {
        backendUrl: props['backend-url'],
        accessToken: props['access-token'],
        workflowsInstanceId: props['workflows-instance-id']
      };
      BackendApi.initClient(config.backendUrl, config.accessToken, config.workflowsInstanceId);
      const response = await BackendApi.init();
      setAppContext(response);
      setInitialized(true);
    })();
  }, [props]);

  useEffect(() => {
    if (initialized && currentScreen === undefined) {
      goNext();
    }
  }, [currentScreen, goNext, initialized]);

  const Screen: FunctionalComponent = () => {
    switch (currentScreen) {
      case 'Introduction':
        return <Introduction employerName={appContext.employerName} onStepComplete={goNext} />;
      case 'SalaryPackaging':
      case 'SalaryPackagingDevices':
      case 'HealthInsurance':
      case 'Boosts':
      case 'Perks':
      case 'Energy':
        return (
          <MarketPlaceOffer
            stepNumber={{
              current: appContext.offers.findIndex((o) => o.name === currentScreen) + 1,
              total: appContext.offers.length
            }}
            marketPlaceOffer={appContext.offers.find((o) => o.name === currentScreen)!}
            onStepComplete={goNext}
          />
        );
      case 'SummaryApp':
        return <SummaryApp email={appContext.email} />;
      case 'SummaryGeneric':
        return <SummaryGeneric />;
      default:
        return (
          <div class="flex justify-center">
            <span class="animate-spin">
              <Loader size="lg" />
            </span>
          </div>
        );
    }
  };

  return (
    <AppContext.Provider value={appContext}>
      <style>{css.toString()}</style>
      <div class="font-inter pt-6 pb-8 md:py-24 px-px">
        <Screen />
      </div>
    </AppContext.Provider>
  );
};

export default App;

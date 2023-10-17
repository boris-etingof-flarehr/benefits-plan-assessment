import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { AppContextData, FlareAppIdentity } from './app.model';
import Loader from './components/loader';
import { AppContext } from './context/app-context';
import css from './index.css';
import Screen from './screens';
import { BackendApi, InitResponse } from './services/backend-api';

interface Props {
  ['backend-url']: string;
  ['access-token']: string;
  ['workflows-instance-id']: string;
}

const App: FunctionalComponent<Props> = (props) => {
  const [appContext, setAppContext] = useState<AppContextData>();

  useEffect(() => {
    (async (): Promise<void> => {
      const config = {
        backendUrl: props['backend-url'],
        accessToken: props['access-token'],
        workflowsInstanceId: props['workflows-instance-id']
      };
      BackendApi.initClient(config.backendUrl, config.accessToken, config.workflowsInstanceId);
      const response = await BackendApi.init();
      setAppContext(getAppContextFromInitResponse(response));
    })();
  }, [props]);

  return (
    <>
      <style>{css.toString()}</style>
      <div class="font-inter pt-6 pb-8 md:py-24 px-px">
        {appContext ? (
          <AppContext.Provider value={appContext}>
            <Screen />
          </AppContext.Provider>
        ) : (
          <div class="flex justify-center">
            <span class="animate-spin">
              <Loader size="lg" />
            </span>
          </div>
        )}
      </div>
    </>
  );
};

const getAppContextFromInitResponse = (initResponse: InitResponse): AppContextData => {
  const isAppEnabled = initResponse.offers.some((offer) => offer.name === 'Perks');

  const flareAppIdentity: FlareAppIdentity = !initResponse.flareAppIdentity
    ? {
        status: 'Unregistered'
      }
    : initResponse.flareAppIdentity.workplaceLinked
    ? {
        status: 'RegisteredAndWorkplaceLinked'
      }
    : {
        status: 'RegisteredButNotWorkplaceLinked',
        maskedPhoneNumber: initResponse.flareAppIdentity.maskedMobileNumber
      };
  return { ...initResponse, isAppEnabled, flareAppIdentity };
};

export default App;

import { FunctionalComponent } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';

import {
  AppContextData,
  CustomerIdentity,
  CustomerRegistrationStatus,
  Workplace,
  WorkplaceLinkingStatus
} from './app.model';
import Loader from './components/loader';
import { AppContext, defaultAppContext } from './context/app-context';
import css from './index.css?inline';
import Screen from './screens';
import {benefitsOnboardingApi, initApi, InitResponse} from './services';
import reloadHelper from './utils/reload-event';

interface Props {
  ['backend-url']: string;
  ['access-token']: string;
  ['workflows-instance-id']: string;
}

const App: FunctionalComponent<Props> = (props) => {
  const [appContext, setAppContext] = useState<AppContextData>();
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    const unsubscribe = reloadHelper.subscribe(() => {
      init().then(() => setRenderKey(renderKey + 1));
    });
    return unsubscribe;
  }, [renderKey]);

  useEffect(() => {
    init();
  }, []);

  const init = async (): Promise<void> => {
    const config = {
      backendUrl: props['backend-url'],
      accessToken: props['access-token'],
      workflowsInstanceId: props['workflows-instance-id']
    };
    initApi(config.backendUrl, config.accessToken, config.workflowsInstanceId);
    const response = await benefitsOnboardingApi.backend.init();
    setAppContext(getAppContextFromInitResponse(response));
  };

  const updateIdentity = useCallback(
    (authenticated: boolean): void => {
      if (!appContext) {
        return;
      }

      const { identity, workplace } = appContext;

      const newRegistrationStatus = authenticated
        ? identity.registrationStatus === 'Unregistered'
          ? 'NewlyRegistered'
          : identity.registrationStatus
        : 'RegistrationAbandoned';

      const newWorkplaceLinkingStatus = authenticated
        ? workplace.linkingStatus === 'Unlinked'
          ? 'NewlyLinked'
          : workplace.linkingStatus
        : 'Unlinked';

      setAppContext({
        ...appContext,
        identity: {
          ...identity,
          registrationStatus: newRegistrationStatus
        },
        workplace: {
          ...workplace,
          linkingStatus: newWorkplaceLinkingStatus
        }
      });
    },
    [appContext]
  );

  return (
    <>
      <style>{css.toString()}</style>
      <div key={renderKey} class="font-inter pt-6 pb-8 md:py-24 px-px">
        {appContext ? (
          <AppContext.Provider value={{ ...appContext, updateIdentity }}>
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

  const registrationStatus: CustomerRegistrationStatus = initResponse.identity.isRegistered
    ? 'PreviouslyRegistered'
    : 'Unregistered';

  const identity: CustomerIdentity = {
    email: initResponse.identity.email,
    phoneNumber: initResponse.identity.phoneNumber ?? '',
    registrationStatus
  };

  const workplaceLinkingStatus: WorkplaceLinkingStatus = initResponse.workplace.isLinkedWithIdentity
    ? 'PreviouslyLinked'
    : 'Unlinked';

  const workplace: Workplace = {
    employerName: initResponse.workplace.employerName,
    linkingStatus: workplaceLinkingStatus
  };
  return {
    ...defaultAppContext,
    ...initResponse,
    isAppEnabled,
    identity,
    workplace
  };
};

export default App;

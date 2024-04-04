import { createContext } from 'preact';

import { AppContextData } from '../app.model';

export const defaultAppContext: AppContextData = {
  offers: [],
  isComplete: false,
  isAppEnabled: false,
  identity: {
    email: '',
    phoneNumber: '',
    verifiedPhoneNumber: '',
    registrationStatus: 'Unregistered'
  },
  workplace:{
    employerName: '',
    linkingStatus: 'Unlinked'
  },
  featureFlags: {
    unifiedCustomerRegistration: false
  },
  updateIdentity: (_authenticated: boolean) => ({})
};

export const AppContext = createContext<AppContextData>(defaultAppContext);

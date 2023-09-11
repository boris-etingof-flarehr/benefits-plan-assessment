import { createContext } from 'preact';

import { AppContextData } from '../app.model';

const defaultAppContext: AppContextData = {
  offers: [],
  employerName: '',
  email: '',
  isComplete: false,
  isAppEnabled: false,
  flareAppIdentity: {
    status: 'Unregistered'
  }
};

export const AppContext = createContext<AppContextData>(defaultAppContext);

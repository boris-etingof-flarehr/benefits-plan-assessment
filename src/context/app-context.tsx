import { createContext } from 'preact';

import { AppContextData } from '../app.model';

const defaultAppContext: AppContextData = {
  offers: [],
  employerName: '',
  email: '',
  isComplete: false
};

export const AppContext = createContext<AppContextData>(defaultAppContext);

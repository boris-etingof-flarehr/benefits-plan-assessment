import { Fragment, FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import Home from '../routes/home';
import NotFoundPage from '../routes/notfound';
import Header from './header';
import css from '../index.css';

interface Props {
  ['backend-url']: string;
  ['access-token']: string;
}

export interface AppConfig {
  backendUrl: string;
  accessToken: string;
}

const App: FunctionalComponent<Props> = (props) => {
  const config: AppConfig = {
    backendUrl: props['backend-url'],
    accessToken: props['access-token']
  };

  return (
    <Fragment>
      <style>{css}</style>
      <div class="font-sans">
        <Header />
        <Router>
          <Route path="/" component={Home} />
          <NotFoundPage default />
        </Router>
        Config: {JSON.stringify(config)}
      </div>
    </Fragment>
  );
};

export default App;

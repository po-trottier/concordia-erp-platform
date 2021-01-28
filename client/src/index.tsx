import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from 'react-redux';

import {App} from './components/App/App'
import {Store, Persistor} from './store/Store';
import {PersistGate} from 'redux-persist/integration/react'
import * as pwa from './serviceWorker';
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate persistor={Persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your plugins to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
pwa.unregister();

import React from 'react';
import ReactDOM from 'react-dom';

import logo from './assets/logo.svg';
import * as pwa from './serviceWorkerRegistration';
import './styles/index.css';

function App() {
  return (
    <div className="App">
      <p>React App</p>
      <img src={logo} alt="Logo" />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
pwa.unregister();

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { App } from '../components/App/App'
import { Store } from '../app/Store';

test('renders properly', () => {
  const { getByText } = render(
    <Provider store={Store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );

  expect(getByText(/Copyright/i)).toBeInTheDocument();
});

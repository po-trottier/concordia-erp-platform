import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Home } from '../pages/Home';

test('renders properly', () => {
  const { getByText } = render(
    <Home />
  );

  expect(getByText(/API Status/i)).toBeInTheDocument();
});

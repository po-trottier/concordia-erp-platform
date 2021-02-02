import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Dashboard } from '../pages/Dashboard';

test('renders properly', () => {
  const { getByText } = render(
    <Dashboard />
  );

  expect(getByText(/API Status/i)).toBeInTheDocument();
});

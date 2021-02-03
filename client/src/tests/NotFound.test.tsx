import React from 'react';
import { render } from '@testing-library/react';

import { NotFound } from '../pages/NotFound';

test('renders properly', () => {
  const { getByText } = render(
    <NotFound />
  );

  expect(getByText(/404/i)).toBeInTheDocument();
});

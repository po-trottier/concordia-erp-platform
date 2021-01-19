import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '../components/layout/App';

test('renders dummy text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Page content/i);
  expect(linkElement).toBeInTheDocument();
});

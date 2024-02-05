import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Register heading', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /Register/i });
  expect(headingElement).toBeInTheDocument();
});

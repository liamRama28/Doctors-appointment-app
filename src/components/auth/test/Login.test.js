import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';

test('Login component snapshot', () => {
  const { asFragment } = render(<Login />);
  expect(asFragment()).toMatchSnapshot();
});

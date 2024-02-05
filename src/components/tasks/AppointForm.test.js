// AppointForm.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import AppointForm from './AppointForm'; // Adjust the import path as necessary

describe('AppointForm', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <AppointForm />
      </BrowserRouter>
    );

    // Check if a key element of your form is present
    expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument();
  });

  // This is a very basic test to ensure the "Full Name" input exists
  test('contains Full Name input', () => {
    render(
      <BrowserRouter>
        <AppointForm />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
  });
});


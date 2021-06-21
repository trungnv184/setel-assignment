import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import React from 'react';

const renderWithMockedProvider = (component: React.ReactNode, mocks: any) => {
  return render(<MockedProvider mocks={mocks}>{component}</MockedProvider>);
};

const asyncDelay = (delay: number = 500) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export { renderWithMockedProvider, asyncDelay };

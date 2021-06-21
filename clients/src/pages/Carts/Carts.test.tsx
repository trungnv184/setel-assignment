import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Carts } from 'pages';
import { GET_PRODUCTS_IN_CART } from 'graphql/query';
import { GET_PRODUCTS_IN_CART_MOCK } from 'test/mocks/carts.mock';

let isCalled = false;
const mocks = [
  {
    request: {
      query: GET_PRODUCTS_IN_CART,
    },
    result: () => {
      isCalled = true;
      return GET_PRODUCTS_IN_CART_MOCK;
    },
  },
];
describe('CartsPage', () => {
  test('Should render carts page', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Carts />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(isCalled).toBeTruthy();
    });

    expect(screen.getByText(/Tâm lý học hạnh phúc/i)).toBeInTheDocument();
    expect(screen.getByText(/Dạy con học ít hiểu nhiều/i)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});

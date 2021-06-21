import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_ORDER_LIST } from 'graphql/query';
import Orders from './Orders';
import { ORDERS_RESPONSE_MOCK } from 'test/mocks/orders.mock';

let isCalled = false;

const getMocks = (isEmptyData: boolean = false) => {
  const response = isEmptyData
    ? {
        data: {
          getOrderList: [],
        },
      }
    : ORDERS_RESPONSE_MOCK;
  return [
    {
      request: {
        query: GET_ORDER_LIST,
      },
      result: () => {
        isCalled = true;
        return response;
      },
    },
  ];
};

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('OrdersPage', () => {
  test('Should render products page', async () => {
    const { container } = render(
      <MockedProvider mocks={getMocks()} addTypename={false}>
        <Orders />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(isCalled).toBeTruthy();
    });

    const bookNameElements = screen.getAllByTestId('book-name');

    // Total 5 books for 2 orders
    expect(bookNameElements.length).toBe(5);
    expect(bookNameElements[0].textContent).toBe('IT Book');
    expect(container).toMatchSnapshot();
  });

  test('Should display empty order message', async () => {
    render(
      <MockedProvider mocks={getMocks(true)} addTypename={false}>
        <Orders />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(isCalled).toBeTruthy();
    });

    expect(
      screen.getByText(/You don't have any orders. Do you want to purchase some books today ?/i)
    ).toBeInTheDocument();
  });
});

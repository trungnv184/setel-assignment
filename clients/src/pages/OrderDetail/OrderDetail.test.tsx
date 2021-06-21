import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_ORDER_BY_ID } from 'graphql/query';
import { GET_ORDER_BY_ID_MOCK } from 'test/mocks/orders.mock';
import OrderDetail from './OrderDetail';

let isCalled = false;

const getMocks = () => {
  return [
    {
      request: {
        query: GET_ORDER_BY_ID,
      },
      result: () => {
        isCalled = true;
        return GET_ORDER_BY_ID_MOCK;
      },
    },
  ];
};
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => jest.fn().mockReturnValue({ orderId: '60cf5c724678b30a48521b09' }),
}));

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('OrderDetailPage', () => {
  test('Should render order detail page page', async () => {
    const { container } = render(
      <MockedProvider mocks={getMocks()} addTypename={false}>
        <OrderDetail />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(isCalled).toBeTruthy();
    });

    expect(screen.getByText(/Trung/i)).toBeInTheDocument();
    expect(screen.getByText(/Nguyen/i)).toBeInTheDocument();
    expect(screen.getByText(/20-06-2021/)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});

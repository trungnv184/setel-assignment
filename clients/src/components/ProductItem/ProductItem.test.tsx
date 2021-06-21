import { render, screen, waitFor } from '@testing-library/react';
import { ProductItem } from 'components';
import { MockedProvider } from '@apollo/client/testing';
import { PRODUCTS_MOCK } from 'test/mocks/products.mock';
import { ADD_PRODUCT_TO_CART } from 'graphql/mutation';

const mocks = [
  {
    request: {
      query: ADD_PRODUCT_TO_CART,
      variables: {
        cartInput: {
          name: 'Mock Name',
          url: 'Mock url',
          price: 500,
        },
      },
    },
    result: () => {
      return {
        data: {
          addToCart: {
            id: 10000,
            name: 'Architecture Design',
            url: 'link-to-book',
            price: 5000,
            quantity: 1,
            createdDate: '2021-07-02',
          },
        },
      };
    },
  },
];
describe('ProductItem', () => {
  test('should match snapshot', async () => {
    const { name, url, price, rating } = PRODUCTS_MOCK[0];
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductItem name={name} url={url} price={price} rating={rating} />
      </MockedProvider>
    );

    const button = screen.getByText(/Buy/i);

    button.click();

    await waitFor(() => {
      const tooltipMessage = screen.getByText(/Your product have been added to cart!/i);
      expect(tooltipMessage).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });
});

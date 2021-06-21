import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { PRODUCTS_MOCK } from 'test/mocks/products.mock';
import { Products } from 'pages';
import { GET_PRODUCTS } from 'graphql/query';

let isCalled = false;
const mocks = [
  {
    request: {
      query: GET_PRODUCTS,
    },
    result: () => {
      isCalled = true;
      return {
        data: {
          products: PRODUCTS_MOCK,
        },
      };
    },
  },
];
describe('ProductsPage', () => {
  test('Should render products page', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Products />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(isCalled).toBeTruthy();
    });

    const bookNameElements = screen.getAllByTestId('book-name');
    expect(bookNameElements.length).toBe(2);
    expect(bookNameElements[0].textContent).toBe('Kiên trì hay từ bỏ');
    expect(bookNameElements[1].textContent).toBe('Rèn luyện tư duy phản biện');

    expect(container).toMatchSnapshot();
  });
});

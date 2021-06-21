import { render } from '@testing-library/react';
import { ProductList } from 'components';
import { MockedProvider } from '@apollo/client/testing';
import { PRODUCTS_MOCK } from 'test/mocks/products.mock';

describe('ProductList', () => {
  test('should match snapshot', () => {
    const { container } = render(
      <MockedProvider mocks={[]}>
        <ProductList products={PRODUCTS_MOCK} />;
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
});

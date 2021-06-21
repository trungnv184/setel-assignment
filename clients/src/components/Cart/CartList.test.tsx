import { render } from '@testing-library/react';
import { CartList } from 'components';
import { CARTS_MOCK } from 'test/mocks/carts.mock';

describe('CartList', () => {
  test('should match snapshot', () => {
    const { container } = render(<CartList carts={CARTS_MOCK} />);
    expect(container).toMatchSnapshot();
  });
});

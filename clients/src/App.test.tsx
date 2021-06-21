import { render } from '@testing-library/react';
import App from './App';

test.skip('render App', () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});

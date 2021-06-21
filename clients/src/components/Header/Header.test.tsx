import { render } from '@testing-library/react';
import { Header } from 'components';
import { BrowserRouter as Router } from 'react-router-dom';
describe('Header', () => {
  test('should match snapshot', () => {
    const { container } = render(
      <Router>
        <Header />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});

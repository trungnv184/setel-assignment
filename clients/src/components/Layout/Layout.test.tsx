import { render } from '@testing-library/react';
import { Layout } from 'components';
import { BrowserRouter as Router } from 'react-router-dom';
describe('Layout', () => {
  test('should match snapshot', () => {
    const { container } = render(
      <Router>
        <Layout>
          <h1>Layout content</h1>
        </Layout>
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});

import { Layout } from 'components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Products, Orders } from 'pages';
import './App.css';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Products />
        </Route>
        <Route path="/orders">
          <Orders />
        </Route>
      </Switch>
    </Router>
  );
};
function App() {
  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
}

export default App;

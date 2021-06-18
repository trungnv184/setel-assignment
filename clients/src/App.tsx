import { Layout } from 'components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Products, Orders, Carts } from 'pages';
import './App.css';

const AppRouter = () => {
  return (
    <Switch>
      <Route path="/" exact={true}>
        <Products />
      </Route>
      <Route path="/your-cart">
        <Carts />
      </Route>

      <Route path="/orders">
        <Orders />
      </Route>
    </Switch>
  );
};
function App() {
  return (
    <Router>
      <Layout>
        <AppRouter />
      </Layout>
    </Router>
  );
}

export default App;

import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

const MenuBar = () => {
  return (
    <Menu size="huge" inverted color="blue">
      <Menu.Item name="home">
        <Icon name="home" />
        <Link to="/">
          <strong>BOOK STORE</strong>
        </Link>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item name="orders">
          <Icon name="ordered list" />
          <Link to="/orders">Your Orders</Link>
        </Menu.Item>
        <Menu.Item name="cart" active={true}>
          <Icon name="cart" />
          <Link to="/your-cart">Your Cart</Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default MenuBar;

import React from 'react';
import { Input, Label, Menu } from 'semantic-ui-react';

const MenuBar = () => {
  return (
    <>
      <Menu inverted color="blue">
        <Menu.Item>
          <Input icon="search" placeholder="Search books..." />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item name="orders">Your Orders</Menu.Item>
          <Menu.Item name="cart" active>
            Your Cart
            <Label color="teal">10</Label>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default MenuBar;

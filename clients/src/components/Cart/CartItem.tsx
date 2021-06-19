import { Table, Image } from 'semantic-ui-react';
import { ProductCart } from 'types/product-cart';
import { formatMoney } from 'utils';

type CartItemProps = {
  cart: ProductCart;
};
const CartItem: React.FC<CartItemProps> = ({ cart }) => {
  const { name, url, price, quantity } = cart;
  return (
    <>
      <Table.Row>
        <Table.Cell>
          <Image src={url} size="small" />
        </Table.Cell>
        <Table.Cell singleLine={true}>{name}</Table.Cell>
        <Table.Cell>{formatMoney(price)}</Table.Cell>
        <Table.Cell>{quantity}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default CartItem;

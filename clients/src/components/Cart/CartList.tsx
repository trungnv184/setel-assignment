import { Table } from 'semantic-ui-react';
import { ProductCart } from 'types/product-cart';
import CartHeader from './CartHeader';
import CartItem from './CartItem';

type CartListProps = {
  carts: ProductCart[];
};
const CartList: React.FC<CartListProps> = ({ carts }) => {
  return (
    <Table celled={true} padded={true}>
      <CartHeader />
      {carts.map((cart) => (
        <CartItem key={cart.id} cart={cart} />
      ))}
    </Table>
  );
};

export default CartList;

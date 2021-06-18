import { useQuery } from '@apollo/client';
import { CartList, ErrorMessage, OrderForm } from 'components';
import { GET_PRODUCTS_IN_CART } from 'graphql/query';
import { Button, Dimmer, Loader, Message } from 'semantic-ui-react';

const Carts: React.FC<any> = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS_IN_CART, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <Dimmer active={true}>
        <Loader />
      </Dimmer>
    );
  }

  if (error) return <ErrorMessage />;

  const carts = data?.getProductsCart || [];

  return (
    <>
      {carts.length > 0 ? (
        <>
          <OrderForm carts={data.getProductsCart} />
          <CartList carts={data.getProductsCart} />
        </>
      ) : (
        <Message>
          <Message.Header>Your Cart</Message.Header>
          <Message.Content>Your cart is empty. Please select your favorite book</Message.Content>
        </Message>
      )}
    </>
  );
};

export default Carts;

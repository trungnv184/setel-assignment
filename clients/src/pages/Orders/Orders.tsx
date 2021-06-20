import React from 'react';
import { ErrorMessage, OrderItems } from 'components';
import { useQuery } from '@apollo/client';
import { GET_ORDER_LIST } from 'graphql/query';
import { Dimmer, Loader, Message } from 'semantic-ui-react';
import { OrderResponse } from 'types/order-response';
import { StyledContainer } from 'components/Common/Style';
import { useHistory } from 'react-router-dom';

const Orders: React.FC<any> = () => {
  const { data, loading, error } = useQuery(GET_ORDER_LIST, {
    fetchPolicy: 'cache-and-network',
  });
  const history = useHistory();

  if (loading) {
    return (
      <Dimmer active={true}>
        <Loader />
      </Dimmer>
    );
  }

  if (error) return <ErrorMessage />;

  const orders = data?.getOrderList as OrderResponse[];

  const renderOrderList = () => {
    return orders.map((order) => (
      <StyledContainer key={order.id} onClick={() => navigateToOrderDetailPage(order.id)}>
        <OrderItems orderItems={order.orderItems} orderState={order.state} createdDate={order.createdDate} />
      </StyledContainer>
    ));
  };

  const navigateToOrderDetailPage = (orderId: string) => {
    history.push(`/order-detail/${orderId}`);
  };
  return (
    <>
      {orders.length > 0 ? (
        renderOrderList()
      ) : (
        <Message
          header="Your order history"
          content="You don't have any orders. Do you want to purchase some books today ?"
        />
      )}
    </>
  );
};

export default Orders;

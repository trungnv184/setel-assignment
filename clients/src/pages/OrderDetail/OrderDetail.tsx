import React from 'react';
import { ErrorMessage, OrderItems, OrderState, OrderSummary } from 'components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ORDER_BY_ID } from 'graphql/query';
import { Dimmer, Loader } from 'semantic-ui-react';
import { OrderPayload } from 'types/order-payload';

const OrderDetail: React.FC<any> = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { data, loading, error } = useQuery(GET_ORDER_BY_ID, {
    variables: { orderId },
  });

  if (loading) {
    return (
      <Dimmer active={true}>
        <Loader />
      </Dimmer>
    );
  }

  if (error) return <ErrorMessage />;

  const orderPayload = data?.getOrder as OrderPayload;
  return (
    <>
      <OrderSummary metadata={orderPayload.metadata} notes={orderPayload.notes} />
      <OrderState />
      <OrderItems orderItems={orderPayload.orderItems} />
    </>
  );
};

export default OrderDetail;

import React from 'react';
import { ErrorMessage, OrderItems, OrderState, OrderSummary } from 'components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ORDER_BY_ID } from 'graphql/query';
import { Dimmer, Loader } from 'semantic-ui-react';
import { OrderResponse } from 'types/order-response';

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

  const orderResponse = data?.getOrder as OrderResponse;
  return (
    <>
      <OrderSummary metadata={orderResponse.metadata} notes={orderResponse.notes} />
      <OrderState />
      <OrderItems orderItems={orderResponse.orderItems} createdDate={orderResponse.createdDate} />
    </>
  );
};

export default OrderDetail;

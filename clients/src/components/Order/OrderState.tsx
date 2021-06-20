import { useQuery } from '@apollo/client';
import { OrderCancellation } from 'components';
import { GET_ORDER_STATUS } from 'graphql/query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Header, Segment, Step } from 'semantic-ui-react';
import { OrderStep } from 'types/order-step.enum';
import AppConfigurations, { getOrderStep } from 'utils';

const OrderState: React.FC<any> = () => {
  const [isOpeningModal, setIsOpeningModal] = useState(false);
  const { orderId } = useParams<{ orderId: string }>();
  const { data, stopPolling } = useQuery(GET_ORDER_STATUS, {
    variables: { orderId },
    pollInterval: AppConfigurations.POLLING_INTERVAL,
    fetchPolicy: 'cache-and-network',
  });

  const orderStep = getOrderStep(data?.getOrder?.state);
  useEffect(() => {
    if ([OrderStep.DELIVERED, OrderStep.CANCEL].includes(orderStep)) {
      stopPolling();
    }
  }, [stopPolling, orderStep]);

  const openConfirmationModal = () => setIsOpeningModal(true);

  const renderOrderSteps = () => {
    return (
      <>
        <Step completed={orderStep >= OrderStep.CONFIRMED} active={true}>
          <Step.Content>
            <Step.Title>CONFIRMED</Step.Title>
            <Step.Description>Your order have been confirmed</Step.Description>
          </Step.Content>
        </Step>
        <Step completed={orderStep >= OrderStep.DELIVERED} active={true}>
          <Step.Content>
            <Step.Title>DELIVERED</Step.Title>
          </Step.Content>
        </Step>
      </>
    );
  };

  const renderCancelledStep = () => (
    <Step active={true}>
      <Step.Content>
        <Step.Title>CANCELLED</Step.Title>
        <Step.Description>Your order have been cancelled</Step.Description>
      </Step.Content>
    </Step>
  );

  const renderCancellationOrder = () => {
    return (
      [OrderStep.CREATED, OrderStep.CONFIRMED].includes(orderStep) && (
        <>
          <OrderCancellation isOpening={isOpeningModal} onCloseModal={setIsOpeningModal} />
          <Button negative={true} floated="right" onClick={openConfirmationModal}>
            Cancel Order
          </Button>
        </>
      )
    );
  };

  return (
    <Segment>
      <Header as="h3" content="Order Status" />
      <Step.Group ordered={true}>
        <Step completed={true}>
          <Step.Content>
            <Step.Title>CREATED</Step.Title>
            <Step.Description>Your order have been created</Step.Description>
          </Step.Content>
        </Step>
        {orderStep === OrderStep.CANCEL ? renderCancelledStep() : renderOrderSteps()}
      </Step.Group>
      {renderCancellationOrder()}
    </Segment>
  );
};

export default OrderState;

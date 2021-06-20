import { useMutation } from '@apollo/client';
import { CANCEL_ORDER } from 'graphql/mutation';
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'semantic-ui-react';

type OrderCancellationProps = {
  isOpening: boolean;
  onCloseModal: (isCloseModal: boolean) => void;
};

const OrderCancellation: React.FC<OrderCancellationProps> = ({ isOpening, onCloseModal }) => {
  const { orderId } = useParams<{ orderId: string }>();
  const [cancelOrderMutation] = useMutation(CANCEL_ORDER);

  const handleCloseModal = () => onCloseModal(false);
  const handleCancelOrder = () => {
    cancelOrderMutation({
      variables: { orderId },
    });

    handleCloseModal();
  };
  return (
    <Modal dimmer={true} size="small" open={isOpening} onClose={handleCloseModal}>
      <Modal.Header>Cancel Order</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to cancel this order?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative={true} onClick={handleCloseModal}>
          No
        </Button>
        <Button positive={true} onClick={handleCancelOrder}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default OrderCancellation;

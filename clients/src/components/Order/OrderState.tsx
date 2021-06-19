import { Header, Segment, Step } from 'semantic-ui-react';

const OrderState: React.FC<any> = () => {
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

        <Step active={true}>
          <Step.Content>
            <Step.Title>CONFIRMED</Step.Title>
            <Step.Description>Your order have been confirmed</Step.Description>
          </Step.Content>
        </Step>

        <Step active={true}>
          <Step.Content>
            <Step.Title>DELIVER</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>
    </Segment>
  );
};

export default OrderState;

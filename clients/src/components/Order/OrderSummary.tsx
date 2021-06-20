import { Container, Header, Segment } from 'semantic-ui-react';
import { OrderInformation } from 'types/order-payload';
import { TextItem } from './Order.style';

type OrderSummaryProps = {
  metadata: OrderInformation;
  notes: string;
};
const OrderSummary: React.FC<OrderSummaryProps> = ({ metadata, notes }) => {
  return (
    <Segment>
      <Container fluid={true} textAlign="left">
        <Header as="h3" content="# Order Summary" />
        <TextItem>
          <span className="title">First Name:</span>
          <span className="content">{metadata.firstName}</span>
        </TextItem>
        <TextItem>
          <span className="title">Last Name:</span>
          <span className="content">{metadata.lastName}</span>
        </TextItem>
        <TextItem>
          <span className="title">Address:</span>
          <span className="content">{metadata.address}</span>
        </TextItem>
        <TextItem>
          <span className="title">Phone Number:</span>
          <span className="content">{metadata.phoneNumber}</span>
        </TextItem>
        <TextItem>
          <span className="title">Notes:</span>
          <span className="content">{notes}</span>
        </TextItem>
      </Container>
    </Segment>
  );
};

export default OrderSummary;

import { Grid, Image, Segment, Label, Icon } from 'semantic-ui-react';
import { ProductCart } from 'types/product-cart';
import { formatDate, formatMoney, getTotalPayment } from 'utils';
import { OrderContentStyled, OrderText } from './Order.style';

interface OrderedItemProps {
  orderItems: ProductCart[];
  createdDate: string;
  orderState?: string;
}

const OrderItems: React.FC<OrderedItemProps> = ({ orderItems, orderState, createdDate }) => {
  return (
    <Segment>
      <Label color="green">
        <Icon name="book" /> {`Selected Books ${orderItems.length}`}
      </Label>
      <Label color="blue">
        <Icon name="payment" /> {getTotalPayment(orderItems)}
      </Label>
      <Label color="purple">
        <Icon name="calendar" /> {formatDate(createdDate)}
      </Label>

      {orderState && (
        <Label color="red">
          <Icon name="truck" /> {orderState}
        </Label>
      )}

      <Grid columns={6}>
        {orderItems.map(({ id, url, name, price, quantity }) => (
          <Grid.Column key={id}>
            <OrderContentStyled>
              <Image src={url} size="small" />
              <OrderText bold={true} data-testid="book-name">
                {name}
              </OrderText>
              <OrderText bold={true}>Price:{formatMoney(price)}</OrderText>
              <OrderText>Quantity:{quantity}</OrderText>
            </OrderContentStyled>
          </Grid.Column>
        ))}
      </Grid>
    </Segment>
  );
};

export default OrderItems;

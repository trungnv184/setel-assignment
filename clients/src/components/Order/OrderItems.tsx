import { Grid, Image, Segment, Header } from 'semantic-ui-react';
import { ProductCart } from 'types/product-cart';
import { formatMoney } from 'utils';
import { OrderContentStyled, OrderText } from './Order.style';

interface OrderedItemProps {
  orderItems: ProductCart[];
}

const OrderItems: React.FC<OrderedItemProps> = ({ orderItems }) => {
  return (
    <Segment>
      <Header as="h3" content="Selected Products" />
      <Grid columns={6}>
        {orderItems.map(({ id, url, name, price, quantity }) => (
          <Grid.Column key={id}>
            <OrderContentStyled>
              <Image src={url} size="small" />
              <OrderText bold={true}>{name}</OrderText>
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

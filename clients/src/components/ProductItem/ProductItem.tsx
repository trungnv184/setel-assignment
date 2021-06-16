import React from 'react';
import { Button, Card, Image, Rating } from 'semantic-ui-react';
import { formatMoney } from 'utils';

type ProductItemProps = {
  name: string;
  url: string;
  price: number;
  rating: number;
};

const ProductItem: React.FC<ProductItemProps> = ({ name, url, price, rating }) => {
  return (
    <Card raised>
      <Image src={url} size="large" wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <strong>{formatMoney(price)}</strong>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Rating icon="star" defaultRating={rating} maxRating={5} />
        <Button color="red" floated="right">Buy</Button>
      </Card.Content>
    </Card>
  );
};

export default ProductItem;

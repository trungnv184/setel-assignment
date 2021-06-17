import { useMutation } from '@apollo/client';
import React from 'react';
import { Button, Card, Image, Popup, Rating } from 'semantic-ui-react';
import { formatMoney } from 'utils';
import { ADD_PRODUCT_TO_CART } from 'graphql/mutation';

type ProductItemProps = {
  name: string;
  url: string;
  price: number;
  rating: number;
};

const ProductItem: React.FC<ProductItemProps> = ({ name, url, price, rating }) => {
  const [addToCart] = useMutation(ADD_PRODUCT_TO_CART);
  const handleAddProductToCart = async () => {
    await addToCart({
      variables: {
        cartInput: {
          name,
          url,
          price,
        },
      },
    });
  };
  return (
    <Card raised={true}>
      <Image src={url} size="large" wrapped={true} ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <strong>{formatMoney(price)}</strong>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra={true}>
        <Rating icon="star" defaultRating={rating} maxRating={5} />
        <Popup
          content="Your product have been added to cart!"
          on="click"
          pinned={true}
          trigger={
            <Button color="red" floated="right" onClick={handleAddProductToCart}>
              Buy
            </Button>
          }
        />
      </Card.Content>
    </Card>
  );
};

export default ProductItem;

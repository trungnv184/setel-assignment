import { ProductItem } from 'components';
import React from 'react';
import { Card } from 'semantic-ui-react';
import { Product } from 'types/product';

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Card.Group itemsPerRow={6}>
      {products && products.map(({ id, ...rest }) => <ProductItem key={id} {...rest} />)}
    </Card.Group>
  );
};

export default ProductList;

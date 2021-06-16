import React from 'react';
import { ProductList } from 'components';
import { Product } from 'types/product';

const Orders: React.FC<any> = () => {
  const products: Product[] = [];
  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Orders;

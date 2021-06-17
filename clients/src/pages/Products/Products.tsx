import React from 'react';
import { ProductList, Search } from 'components';
import { useQuery } from '@apollo/client';
import { Loader, Dimmer } from 'semantic-ui-react';
import { GET_PRODUCTS } from '../../graphql';

const Products: React.FC<any> = () => {
  const { loading, data } = useQuery(GET_PRODUCTS);

  if (loading) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  }

  console.log(data.products, 'Products');

  return (
    <>
      <ProductList products={data.products} />
    </>
  );
};

export default Products;

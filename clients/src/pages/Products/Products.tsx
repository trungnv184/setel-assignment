import React from 'react';
import { ErrorMessage, ProductList } from 'components';
import { useQuery } from '@apollo/client';
import { Loader, Dimmer } from 'semantic-ui-react';
import { GET_PRODUCTS } from 'graphql/query';

const Products: React.FC<any> = () => {
  const { loading, data, error } = useQuery(GET_PRODUCTS);

  if (loading) {
    return (
      <Dimmer active={true}>
        <Loader />
      </Dimmer>
    );
  }

  if (error) return <ErrorMessage />;

  return (
    <>
      <ProductList products={data.products} />
    </>
  );
};

export default Products;

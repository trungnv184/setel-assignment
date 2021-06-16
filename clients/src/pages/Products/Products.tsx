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
  const onSearchProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <>
      <Search onSearch={onSearchProduct} />
      <ProductList products={data.products} />
    </>
  );
};

export default Products;

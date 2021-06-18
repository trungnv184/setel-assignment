import { gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      url
      rating
    }
  }
`;

const GET_PRODUCTS_IN_CART = gql`
  query GetProductsCart {
    getProductsCart {
      id
      name
      price
      url
      quantity
    }
  }
`;

export { GET_PRODUCTS, GET_PRODUCTS_IN_CART };

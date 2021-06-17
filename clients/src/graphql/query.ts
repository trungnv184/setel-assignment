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

export { GET_PRODUCTS };

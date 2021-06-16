import { gql } from 'apollo-server-express';
import { GenericModel } from './models';

const productModel = new GenericModel('products');

export const typeDefs = gql`
  type Product {
    id: ID
    name: String
    url: String
    price: Int
    rating: Int
  }

  type Query {
    products: [Product]
  }
`;

export const resolvers = {
  Query: {
    products() {
      return productModel.list();
    },
  },
};

import { gql } from 'apollo-server-express';
import { GenericModel } from './models';
import { getUUID } from './helper';

const productModel = new GenericModel('products');
const cartsModel = new GenericModel('carts');

export const typeDefs = gql`
  type Product {
    id: ID
    name: String
    url: String
    price: Int
    rating: Int
  }

  type Cart {
    id: ID
    name: String
    url: String
    price: Int
    createdDate: String
  }

  type Query {
    products: [Product]
  }

  type Mutation {
    addToCart(cartInput: CartInput): Cart
  }

  input CartInput {
    name: String
    url: String
    price: Int
  }
`;

export const resolvers = {
  Query: {
    products() {
      return productModel.list();
    },
  },
  Mutation: {
    addToCart: async (_, { cartInput }) => {
      const { name, url, price } = cartInput;
      return cartsModel.create({
        id: getUUID(),
        name,
        url,
        price,
      });
    },
  },
};

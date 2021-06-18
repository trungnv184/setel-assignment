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
    quantity: Int
    createdDate: String
  }

  type Query {
    products: [Product]
    getProductsCart: [Cart]
  }

  type Mutation {
    addToCart(cartInput: CartInput): Cart
  }

  input CartInput {
    name: String
    url: String
    price: Int
    quantity: Int
  }
`;

export const resolvers = {
  Query: {
    products() {
      return productModel.list();
    },
    getProductsCart() {
      return cartsModel.list();
    },
  },
  Mutation: {
    addToCart: async (_, { cartInput }) => {
      const { name, url, price, quantity } = cartInput;
      return cartsModel.create({
        id: getUUID(),
        name,
        url,
        price,
        quantity: quantity ? quantity : 1,
      });
    },
  },
};

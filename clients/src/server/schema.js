import { gql } from 'apollo-server-express';
import { GenericModel, OrderModel } from './models';
import { getUUID } from './helper';

const productModel = new GenericModel('products');
const cartsModel = new GenericModel('carts');
const orderModel = new OrderModel();

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

  type OrderMetaData {
    firstName: String
    lastName: String
    address: String
    phoneNumber: String
  }
  type Order {
    orderItems: [Cart]
    metadata: OrderMetaData
    notes: String
  }

  type Query {
    products: [Product]
    getProductsCart: [Cart]
  }

  type Mutation {
    addToCart(cartInput: CartInput): Cart
    createOrder(orderInput: OrderInput): Order
  }

  input CartInput {
    id: ID
    name: String
    url: String
    price: Int
    quantity: Int
  }

  input OrderMetaDataInput {
    firstName: String
    lastName: String
    address: String
    notes: String
    phoneNumber: String
  }

  input OrderInput {
    orderItems: [CartInput]
    metadata: OrderMetaDataInput
    notes: String
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
      const { name, url, price, quantity, id } = cartInput;
      return cartsModel.create({
        id: id || getUUID(),
        name,
        url,
        price,
        quantity: quantity ? quantity : 1,
      });
    },
    createOrder: async (_, { orderInput }) => {
      return orderModel.createOrder(orderInput);
    },
  },
};

import { gql } from 'apollo-server-express';
import { GenericModel, OrderModel } from './models';
import { getUUID, mapResponseDataForOrder } from './helper';

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
    id: String
    orderItems: [Cart]
    metadata: OrderMetaData
    notes: String
    state: String
    createdDate: String
    updatedDate: String
  }

  type Query {
    products: [Product]
    getProductsCart: [Cart]
    getOrder(orderId: String): Order
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
    getOrder: async (_, { orderId }) => {
      return mapResponseDataForOrder(await orderModel.getOrder(orderId));
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
      return mapResponseDataForOrder(await orderModel.createOrder(orderInput));
    },
  },
};

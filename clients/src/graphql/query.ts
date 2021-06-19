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

const GET_ORDER_BY_ID = gql`
  query GetOrder($orderId: String) {
    getOrder(orderId: $orderId) {
      id
      orderItems {
        id
        name
        price
        url
        quantity
      }
      metadata {
        firstName
        lastName
        address
        phoneNumber
      }
      notes
      state
      createdDate
      updatedDate
    }
  }
`;

const GET_ORDER_STATUS = gql`
  query GetOrderStatus($orderId: String) {
    getOrder(orderId: $orderId) {
      state
    }
  }
`;

export { GET_PRODUCTS, GET_PRODUCTS_IN_CART, GET_ORDER_BY_ID, GET_ORDER_STATUS };

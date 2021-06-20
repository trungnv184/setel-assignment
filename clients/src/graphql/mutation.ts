import { gql } from '@apollo/client';

const ADD_PRODUCT_TO_CART = gql`
  mutation AddToCart($cartInput: CartInput) {
    addToCart(cartInput: $cartInput) {
      id
      name
      url
      price
    }
  }
`;

const CREATE_ORDER_PRODUCTS = gql`
  mutation CreateOrder($orderInput: OrderInput) {
    createOrder(orderInput: $orderInput) {
      id
      orderItems {
        id
        name
        url
        price
        quantity
        createdDate
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

const CANCEL_ORDER = gql`
  mutation CancelOrder($orderId: String) {
    cancelOrder(orderId: $orderId) {
      id
      state
    }
  }
`;

export { ADD_PRODUCT_TO_CART, CREATE_ORDER_PRODUCTS, CANCEL_ORDER };

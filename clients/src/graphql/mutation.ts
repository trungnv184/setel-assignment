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

export { ADD_PRODUCT_TO_CART };

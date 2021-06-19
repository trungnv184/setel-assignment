import { OrderState } from 'types/order-state.enum';

export const getOrderStep = (orderStatus: string): number => {
  switch (orderStatus) {
    case OrderState.CREATED:
      return 1;
    case OrderState.CONFIRMED:
      return 2;
    case OrderState.DELIVERED:
      return 3;
    case OrderState.CANCELLED:
      return 0;
    default:
      return 3;
  }
};

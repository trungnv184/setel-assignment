import { formatMoney } from 'utils';
import { ProductCart } from 'types/product-cart';

const getTotalPayment = (orderItems: ProductCart[]) => {
  return formatMoney(
    orderItems.reduce((sum, curr) => {
      return sum + curr.price * curr.quantity;
    }, 0)
  );
};

export { getTotalPayment };

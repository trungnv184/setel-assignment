import { OrderInformation, OrderPayload } from 'types/order-payload';
import { ProductCart } from 'types/product-cart';

const buildOrderPayload = (orderInformation: OrderInformation, carts: ProductCart[], notes: string): OrderPayload => {
  return {
    orderItems: carts,
    metadata: orderInformation,
    notes,
  } as OrderPayload;
};

export { buildOrderPayload };

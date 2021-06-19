// orderItems: OrderItem[];

import { ProductCart } from './product-cart';
export interface OrderInformation {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
}
export interface OrderPayload {
  orderItems: ProductCart[];
  metadata: OrderInformation;
  notes: string;
}

import { OrderPayload } from './order-payload';
import { OrderState } from './order-state.enum';

export interface OrderResponse extends OrderPayload {
  id: string;
  state: OrderState;
  createdDate: string;
  updatedDate: string;
}

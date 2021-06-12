import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  private readonly HIGHEST_ORDER_NUMBER = 5;
  public isOrderPaymentConfirmed(order): boolean {
    return order?.quantity > this.HIGHEST_ORDER_NUMBER || Math.random() > 1;
  }
}

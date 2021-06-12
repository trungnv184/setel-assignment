import { PaymentState } from '@common/enums/payment-state.enum';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Order } from '@schemas';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject('PAYMENT_SERVICE') private readonly client: ClientProxy
  ) {}
  public async processPayment(order: Order): Promise<PaymentState> {
    const processedPaymentStatus = await this.client
      .send('PROCESS_ORDER_PAYMENT', order)
      .toPromise();
    return processedPaymentStatus
      ? PaymentState.CONFIRMED
      : PaymentState.DECLINED;
  }
}

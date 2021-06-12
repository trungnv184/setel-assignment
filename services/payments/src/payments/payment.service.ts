import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private readonly HIGHEST_ORDER_NUMBER = 5;

  public isOrderPaymentConfirmed(order): boolean {
    const isValidOrder =
      order?.orderItems?.length > this.HIGHEST_ORDER_NUMBER ||
      Math.random() > 0.5;

    this.logger.debug(
      `Payment Process received data ${JSON.stringify(
        order
      )} and check valid order result ${isValidOrder}`
    );

    return isValidOrder;
  }
}

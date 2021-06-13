import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private readonly HIGHEST_ORDER_NUMBER = 5;
  private readonly LOWEST_ORDER_NUMBER = 1;
  private readonly VALID_NUMBER = 1.5;

  public isValidOrder(order): boolean {
    const comparedNumber = this.randomNumber(
      this.LOWEST_ORDER_NUMBER,
      this.HIGHEST_ORDER_NUMBER
    );

    this.logger.debug(
      `Payment Process received data ${JSON.stringify(
        order
      )} and check valid order result ${comparedNumber}`
    );

    // Assume the logic return valid payment based on random number and number of ordered item greater than 2
    return comparedNumber >= this.VALID_NUMBER || order?.orderItems.length >= 2;
  }

  private randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

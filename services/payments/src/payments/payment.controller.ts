import { PaymentService } from './payment.service';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern('PROCESS_ORDER_PAYMENT')
  async processPaymentStatus(order: any): Promise<boolean> {
    return this.paymentService.isOrderPaymentConfirmed(order);
  }
}

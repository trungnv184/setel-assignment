import { PaymentsService } from './payments.service';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentConstant } from '@common/constants/payment.constant';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PaymentConstant.PAYMENT_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://hyyyfwsq:Znh8CHBdx4vZFBAajeD3xgWdKkqeOvwu@snake.rmq2.cloudamqp.com/hyyyfwsq'],
          queue: 'payment_queue',
          queueOptions: {
            durable: false
          }
        }
      }
    ])
  ],
  providers: [PaymentsService],
  exports: [PaymentsService]
})
export class PaymentsModule {}

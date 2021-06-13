import { OrderConstant } from '@common/constants/order.constant';
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '@orders/schemas';
import { PaymentsModule } from '@payments/payments.module';
import { BullModule } from '@nestjs/bull';
import { OrderQueueProcessor } from '@orders/order-queue.processor';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema
      }
    ]),
    BullModule.registerQueue({
      name: OrderConstant.ORDER_QUEUE_NAME
    }),
    PaymentsModule
  ],

  controllers: [OrdersController],
  providers: [OrdersService, OrderQueueProcessor],
  exports: [OrdersService]
})
export class OrdersModule {}

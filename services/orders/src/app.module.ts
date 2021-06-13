import { MONGO_URI } from '@orders/configs/environment.config';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from '@orders/orders.module';
import { PaymentsModule } from '@payments/payments.module';
@Module({
  imports: [
    OrdersModule,
    PaymentsModule,
    MongooseModule.forRoot(MONGO_URI, {
      useCreateIndex: true,
      useFindAndModify: false
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379
      }
    })
  ]
})
export class AppModule {}

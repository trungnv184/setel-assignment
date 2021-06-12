import { MONGO_URI } from '@configs';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from '@orders/orders.module';
import { PaymentsModule } from '@payments/payments.module';

@Module({
  imports: [OrdersModule, PaymentsModule, MongooseModule.forRoot(MONGO_URI)]
})
export class AppModule {}

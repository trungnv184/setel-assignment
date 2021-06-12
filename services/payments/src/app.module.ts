import { PaymentController, PaymentService } from '@payments';
import { Module } from '@nestjs/common';
@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class AppModule {}

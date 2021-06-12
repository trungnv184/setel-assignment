import { Prop } from '@nestjs/mongoose';

export class OrderItem {
  @Prop()
  productName: string;

  @Prop()
  productUrl: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;
}

import { Prop } from '@nestjs/mongoose';

export class OrderItem {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  url: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;
}

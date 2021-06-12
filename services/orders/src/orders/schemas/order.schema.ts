import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderModel = Order & Document;
@Schema()
export class Order {
  @Prop()
  productName: string;

  @Prop()
  productUrl: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;

  @Prop()
  notes: string;

  @Prop()
  state: string;

  @Prop({ type: Date, default: Date.now })
  orderedDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

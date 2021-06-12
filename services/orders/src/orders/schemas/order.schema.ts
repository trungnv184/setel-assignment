import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderItem } from './order-items.schema';
import { OrderMetaData } from './order-metada.schema';

export type OrderModel = Order & Document;

@Schema()
export class Order {
  @Prop([OrderItem])
  orderItems: OrderItem[];

  @Prop()
  notes: string;

  @Prop()
  state: string;

  @Prop(OrderMetaData)
  metadata: OrderMetaData;

  @Prop({ type: Date, default: Date.now })
  createdDate: Date;

  @Prop({ type: Date, default: Date.now })
  updatedDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

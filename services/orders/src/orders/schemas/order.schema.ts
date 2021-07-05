import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { OrderItem } from './order-items.schema';
import { OrderMetaData } from './order-metada.schema';

export type OrderModel = Order & Document;

@Schema()
export class Order {
  @ApiProperty({
    type: [OrderItem],
    name: 'orderItems'
  })
  @Prop([OrderItem])
  orderItems: OrderItem[];

  @ApiProperty()
  @Prop()
  notes: string;

  @ApiProperty()
  @Prop()
  state: string;

  @ApiProperty({
    type: OrderMetaData,
    name: 'metadata'
  })
  @Prop(OrderMetaData)
  metadata: OrderMetaData;

  @ApiProperty({
    type: Date
  })
  @Prop({ type: Date, default: Date.now })
  createdDate: Date;

  @ApiProperty({
    type: Date
  })
  @Prop({ type: Date, default: Date.now })
  updatedDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

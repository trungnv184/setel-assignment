import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';

export class OrderItem {
  @ApiProperty()
  @Prop()
  id: number;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  url: string;

  @ApiProperty()
  @Prop()
  price: number;

  @ApiProperty()
  @Prop()
  quantity: number;
}

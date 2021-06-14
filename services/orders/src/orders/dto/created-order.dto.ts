import { OrderItem } from '@common/interfaces/order-item.interface';
import { OrderInformation } from '@common/interfaces/order-metadata.interface';
import { OrderState } from '@common/enums/order-state.enum';
import { MaxLength, IsOptional, IsIn, IsObject, IsArray } from 'class-validator';
export class CreateOrderDto {
  @IsArray()
  orderItems: OrderItem[];

  @IsObject()
  readonly metadata: OrderInformation;

  @IsOptional()
  @MaxLength(100)
  readonly notes: string;

  @IsOptional()
  @IsIn([OrderState.CREATED, OrderState.CONFIRMED, OrderState.CANCELLED, OrderState.DELIVERED])
  readonly state: string;
}

import { OrderState } from '@common/enums/order-state.enum';
import {
  IsString,
  MaxLength,
  IsNotEmpty,
  IsNumber,
  Min,
  MinLength,
  IsOptional,
  IsIn
} from 'class-validator';
export class CreateOrderDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  readonly productName: string;

  @IsString()
  @MinLength(0)
  @MaxLength(100)
  readonly productUrl: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  readonly quantity: number;

  @IsOptional()
  @MaxLength(100)
  readonly notes: string;

  @IsOptional()
  @IsIn([
    OrderState.CREATED,
    OrderState.CONFIRMED,
    OrderState.CANCELED,
    OrderState.DELIVERED
  ])
  state: string;
}

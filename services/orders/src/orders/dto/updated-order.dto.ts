import { CreateOrderDto } from './created-order.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatedOrderDto extends PartialType(CreateOrderDto) {}

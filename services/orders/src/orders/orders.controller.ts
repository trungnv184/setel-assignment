import { CreateOrderDto } from '@dto';
import { Order } from '@schemas';
import { OrdersService } from './orders.service';
import { Controller, Get, Post, Param, Body, Delete, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  public async getAllOrders(): Promise<Order[]> {
    return this.orderService.all();
  }

  @Get(':id')
  public async fetchOrderById(@Param('id') orderId: string): Promise<Order> {
    return this.orderService.findOne(orderId);
  }

  @Get(':id/status')
  public async getOderStatus(@Param('id') orderId: string): Promise<string> {
    const order = await this.orderService.findOne(orderId);
    return order.state;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  public async createOrder(@Body() createdOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createdOrderDto);
  }

  @Delete(':id')
  public async cancelOrder(@Param('id') orderId: string): Promise<Order> {
    return this.orderService.cancelOrderById(orderId);
  }
}

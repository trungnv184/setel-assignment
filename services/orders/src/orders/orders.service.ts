import { OrderQueueProcessor } from '@orders/order-queue.processor';
import { OrderState } from '@common/enums/order-state.enum';
import { UpdatedOrderDto, CreateOrderDto } from '@dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderModel } from '@schemas';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderModel>,
    private readonly orderQueueProcessor: OrderQueueProcessor
  ) {}

  public async create(createdOrderDto: CreateOrderDto): Promise<Order> {
    const orderToSave = {
      ...createdOrderDto,
      state: OrderState.CREATED
    };
    const order = await this.orderModel.create(orderToSave);
    this.logger.debug(`Order created successfully, ${order}`);
    await this.orderQueueProcessor.addOrderForPaymentProcessing(order);
    return order;
  }

  public async all(): Promise<Order[]> {
    return this.orderModel.find().sort({ createdDate: -1 }).exec();
  }

  public async findOne(orderId: string): Promise<Order> {
    return this.orderModel.findById({ _id: orderId });
  }

  public async updateOrder(orderId: string, updatedOrderDto: UpdatedOrderDto): Promise<Order> {
    const orderToUpdate = await this.orderModel.findOneAndUpdate({ _id: orderId }, updatedOrderDto);

    if (!orderToUpdate) {
      throw new NotFoundException(`Order #${orderId} not found`);
    }

    return orderToUpdate;
  }

  public async cancelOrderById(orderId: string): Promise<Order> {
    let orderToCancel = await this.findOne(orderId);
    if (orderToCancel && orderToCancel.state !== OrderState.DELIVERED) {
      orderToCancel = await this.orderModel.findOneAndUpdate({ _id: orderId }, { state: OrderState.CANCELLED });

      if (!orderToCancel) {
        throw new NotFoundException(`Order #${orderId} not found`);
      }
    }

    return orderToCancel;
  }
}

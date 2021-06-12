import { WAIT_FOR_PAYMENT_PROCESSING } from '@configs';
import { OrderState } from '@common/enums/order-state.enum';
import { PaymentState } from '@common/enums/payment-state.enum';
import { UpdatedOrderDto, CreateOrderDto } from '@dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaymentsService } from '@payments/payments.service';
import { Order, OrderModel } from '@schemas';
import { Model } from 'mongoose';
import asyncDelay from '@utils/asyncDelay';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderModel>,
    private readonly paymentService: PaymentsService
  ) {}

  public async create(createdOrderDto: CreateOrderDto): Promise<Order> {
    const orderToSave = {
      ...createdOrderDto,
      state: OrderState.CREATED
    };
    const savedOrderModel = new this.orderModel(orderToSave);
    const savedOrder = await savedOrderModel.save();

    const { _id: orderId } = savedOrder;
    setTimeout(async () => {
      this.processPayment(orderId, savedOrder).then((orderData) => {
        this.processOrderDeliver(orderId, orderData);
      });
    }, 0);

    return savedOrder;
  }

  public async all(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  public async findOne(orderId: string): Promise<Order> {
    return this.orderModel.findById({ _id: orderId });
  }

  public async updateOrder(
    orderId: string,
    updatedOrderDto: UpdatedOrderDto
  ): Promise<Order> {
    const orderToUpdate = await this.orderModel.findOneAndUpdate(
      { _id: orderId },
      updatedOrderDto
    );

    if (!orderToUpdate) {
      throw new NotFoundException(`Order #${orderId} not found`);
    }

    return orderToUpdate;
  }

  public async cancelOrderById(orderId: string): Promise<Order> {
    let orderToCancel = await this.findOne(orderId);
    if (orderToCancel && orderToCancel.state !== OrderState.DELIVERED) {
      orderToCancel = await this.orderModel.findOneAndUpdate(
        { _id: orderId },
        { state: OrderState.CANCELED }
      );
    }

    return orderToCancel;
  }

  public async processPayment(orderId: string, order: Order): Promise<Order> {
    if (order && order.state === OrderState.CREATED) {
      const status = await this.paymentService.processPayment(order);

      const isConfirmed = status === PaymentState.CONFIRMED;

      await this.orderModel.findOneAndUpdate(
        { _id: order },
        { state: isConfirmed ? OrderState.CONFIRMED : OrderState.CANCELED }
      );

      return this.findOne(orderId);
    }

    return order;
  }

  public async processOrderDeliver(
    orderId: string,
    order: Order
  ): Promise<Order> {
    if (order && order.state === OrderState.CONFIRMED) {
      await asyncDelay(WAIT_FOR_PAYMENT_PROCESSING);
      await this.orderModel.findOneAndUpdate(
        { _id: orderId },
        { state: OrderState.DELIVERED }
      );

      return this.findOne(orderId);
    }

    return order;
  }
}

import { OrderJob } from './common/enums/order-job.enum';
import { OrderConstant } from './common/constants/order.constant';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Order, OrderModel } from '@schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, Queue } from 'bull';
import { Logger } from '@nestjs/common';
import { OrderState } from '@common/enums/order-state.enum';
import { PaymentsService } from '@payments/payments.service';
import { PaymentState } from '@common/enums/payment-state.enum';
import { DELAY_DELIVERY } from '@orders/configs/environment.config';

@Processor(OrderConstant.ORDER_QUEUE_NAME)
export class OrderQueueProcessor {
  private readonly logger = new Logger(OrderQueueProcessor.name);
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderModel>,
    @InjectQueue(OrderConstant.ORDER_QUEUE_NAME) private orderQueue: Queue,
    private readonly paymentService: PaymentsService
  ) {}

  public async addOrderForPaymentProcessing(order: Order): Promise<void> {
    await this.orderQueue.add(OrderJob.PROCESS_PAYMENT, { order }, { delay: DELAY_DELIVERY });
  }

  @Process(OrderJob.PROCESS_PAYMENT)
  public async processPayment({ data }: Job<{ order: OrderModel }>): Promise<void> {
    if (data?.order.state !== OrderState.CREATED) {
      return;
    }

    this.logger.debug(`Starting PROCESS_PAYMENT job ${data.order._id}`);
    const processedPaymentStatus = await this.paymentService.processPayment(data.order);

    this.logger.debug(
      `PROCESS_PAYMENT job response status ${
        processedPaymentStatus === PaymentState.CONFIRMED ? 'CONFIRMED' : 'CANCELLED'
      }`
    );

    const { _id: orderId } = data.order;

    processedPaymentStatus === PaymentState.CONFIRMED
      ? this.orderQueue.add(OrderJob.CONFIRMED, { orderId })
      : this.orderQueue.add(OrderJob.CANCELLED, { orderId });
  }

  @Process(OrderJob.CONFIRMED)
  public async processConfirmedOrder(job: Job<{ orderId: string }>): Promise<void> {
    const orderId = job.data.orderId;

    await this.updateOrderStatus(orderId, OrderState.CONFIRMED);
    this.logger.debug(`Staring order CONFIRMED job #${orderId}`);

    this.orderQueue.add(OrderJob.DELIVERED, { orderId }, { delay: DELAY_DELIVERY });
  }

  @Process(OrderJob.DELIVERED)
  public async processDeliveredOrder(job: Job<{ orderId: string }>): Promise<void> {
    const orderId = job.data.orderId;
    const order = await this.orderModel.findById(orderId);

    if (order?.state === OrderState.CONFIRMED) {
      this.logger.debug(`Staring order DELIVERED job #${orderId}`);
      await this.updateOrderStatus(orderId, OrderState.DELIVERED);
    }
  }

  @Process(OrderJob.CANCELLED)
  public async processCanceledOrder(job: Job<{ orderId: string }>): Promise<void> {
    const orderId = job.data.orderId;
    this.logger.debug(`Staring order CANCELLED job ${orderId}`);

    await this.updateOrderStatus(orderId, OrderState.CANCELLED);
  }

  private updateOrderStatus(orderId: string, state: OrderState) {
    return this.orderModel.updateOne({ _id: orderId }, { state, updatedDate: new Date() });
  }
}

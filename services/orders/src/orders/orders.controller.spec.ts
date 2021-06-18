import { CreateOrderDto } from '@dto';
import { OrderState } from '@common/enums/order-state.enum';
import { PaymentsModule } from '@payments/payments.module';
import { OrderConstant } from '@common/constants/order.constant';
import { OrderQueueProcessor } from './order-queue.processor';
import { Order } from './schemas/order.schema';
import { OrdersController } from './orders.controller';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { OrdersService } from './orders.service';

const ORDERS_MOCK = [
  {
    orderItems: [
      {
        id: 1,
        name: 'The Clean Architecture',
        url: 'http://amazon.com/books/it/clean-architecture',
        price: 50000,
        quantity: 2
      }
    ],
    metadata: {
      firsName: 'Trung',
      lastName: 'Nguyen',
      address: 'Ho Chi Minh City',
      phoneNumber: '0906925896',
      payMethod: 'Cash'
    },
    notes: 'Add book care service',
    state: 'Created',
    createdDate: '2021-06-14T04:33:01.086Z',
    updatedDate: '2021-06-14T04:33:01.086Z'
  }
] as unknown as Order[];

describe('OrdersController', () => {
  let ordersController: OrdersController;
  let orderService: OrdersService;
  let orderQueueProcessor: OrderQueueProcessor;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: OrderConstant.ORDER_QUEUE_NAME
        }),
        PaymentsModule
      ],
      controllers: [OrdersController],
      providers: [
        OrdersService,
        OrderQueueProcessor,
        {
          provide: getModelToken(Order.name),
          useValue: {}
        }
      ]
    }).compile();

    orderService = moduleRef.get<OrdersService>(OrdersService);
    ordersController = moduleRef.get<OrdersController>(OrdersController);
    orderQueueProcessor = moduleRef.get<OrderQueueProcessor>(OrderQueueProcessor);
  });

  it('should create instance orders controller successfully', async () => {
    expect(ordersController).toBeDefined();
  });
  it('should return list of orders successfully', async () => {
    jest.spyOn(orderService, 'all').mockResolvedValue(ORDERS_MOCK);
    expect(await ordersController.getAllOrders()).toBe(ORDERS_MOCK);
  });

  it('should Fetch order by id successfully', async () => {
    const orderMock = {
      ...ORDERS_MOCK[0]
    } as Order;
    const orderId = '60c6dbfd040f89585a7a8f11';

    jest.spyOn(orderService, 'findOne').mockResolvedValue(orderMock);
    expect(await ordersController.fetchOrderById(orderId)).toBe(orderMock);
  });

  describe('getOderStatus', () => {
    it('should get order status by id successfully', async () => {
      const orderMock = {
        ...ORDERS_MOCK[0],
        state: OrderState.CONFIRMED
      } as unknown as Order;
      const orderId = '60c6dbfd040f89585a7a8f11';

      jest.spyOn(orderService, 'findOne').mockResolvedValue(orderMock);
      expect(await ordersController.getOderStatus(orderId)).toBe(OrderState.CONFIRMED);
    });

    it('should get order status by id failed', async () => {
      const orderMock = {
        ...ORDERS_MOCK[0],
        state: OrderState.CONFIRMED
      } as unknown as Order;

      jest.spyOn(orderService, 'findOne').mockRejectedValue(new Error('OrderId not found'));
      try {
        const orderId = '60c6dbfd040f89585a7a8f11';
        await ordersController.getOderStatus(orderId);
      } catch (err) {
        expect(err.message).toContain('OrderId not found');
      }
    });
  });

  it('should get order status by id successfully', async () => {
    const orderMock = {
      ...ORDERS_MOCK[0]
    } as unknown as Order;

    const createdOrderDto = {
      ...orderMock
    } as unknown as CreateOrderDto;
    jest.spyOn(orderService, 'create').mockResolvedValue(orderMock);
    expect(await ordersController.createOrder(createdOrderDto)).toBe(orderMock);
  });
});

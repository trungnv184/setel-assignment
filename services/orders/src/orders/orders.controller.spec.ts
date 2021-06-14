import { OrderQueueProcessor } from './order-queue.processor';
import { Order } from './schemas/order.schema';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

const ORDERS_MOCK = [
  {
    orderItems: [
      {
        productName: 'The Clean Architecture',
        productUrl: 'http://amazon.com/books/it/clean-architecture',
        price: 50000,
        quantity: 2
      }
    ],
    metadata: {
      customerName: 'Trung Nguyen',
      address: 'Ho Chi Minh City',
      phoneNumber: '0906925896',
      payMethod: 'Cash'
    },
    notes: 'Add book care service',
    state: 'Created'
  }
] as Order[];

describe('CatsController', () => {
  let ordersController: OrdersController;
  let orderService: OrdersService;
  let orderQueueProcessor: OrderQueueProcessor;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
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

  describe('getAllOrders', () => {
    it('should return an array of cats', async () => {
      jest.spyOn(orderService, 'all').mockResolvedValue(ORDERS_MOCK);
      expect(await ordersController.getAllOrders()).toBe(ORDERS_MOCK);
    });
  });
});

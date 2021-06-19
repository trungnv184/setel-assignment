import { UpdatedOrderDto } from './dto/updated-order.dto';
import { OrderState } from './common/enums/order-state.enum';
import { OrderModel, OrderSchema } from './schemas/order.schema';
import { CreateOrderDto } from './dto/created-order.dto';
import { PaymentsModule } from '@payments/payments.module';
import { OrderConstant } from '@common/constants/order.constant';
import { OrderQueueProcessor } from './order-queue.processor';
import { Order } from '@schemas';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { OrdersService } from './orders.service';
import { Model } from 'mongoose';

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
      firstName: 'Trung',
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

const getCreatedOrderDto = (customData: any = {}) => {
  return {
    ...ORDERS_MOCK[0],
    ...customData
  } as CreateOrderDto;
};

describe('OrdersController', () => {
  let orderService: OrdersService;
  let orderQueueProcessor: OrderQueueProcessor;
  let orderModel: Model<OrderModel>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: OrderConstant.ORDER_QUEUE_NAME
        }),
        PaymentsModule
      ],
      providers: [
        OrdersService,
        OrderQueueProcessor,
        {
          provide: getModelToken(Order.name),
          useValue: {
            create: jest.fn().mockImplementation((dto) => {
              return {
                ...dto,
                _id: '1212'
              };
            }),
            find: jest.fn().mockImplementation(() => {
              return ORDERS_MOCK;
            }),
            findById: jest.fn(),
            findOneAndUpdate: jest.fn()
          }
        }
      ]
    }).compile();

    orderService = moduleRef.get<OrdersService>(OrdersService);
    orderQueueProcessor = moduleRef.get<OrderQueueProcessor>(OrderQueueProcessor);
    orderModel = moduleRef.get<Model<OrderModel>>(getModelToken(Order.name));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create instance order service', () => {
    expect(orderService).toBeDefined();
  });

  it('should create order service successfully', async () => {
    const createdOrderDto = getCreatedOrderDto();
    jest.spyOn(orderQueueProcessor, 'addOrderForPaymentProcessing').mockImplementation(() => {
      return Promise.resolve();
    });
    const response = await orderService.create(createdOrderDto);
    expect((response as any)._id).toBe('1212');
  });

  it('should find all orders successfully', async () => {
    jest.spyOn(orderModel, 'find').mockImplementation(() => {
      return {
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(ORDERS_MOCK)
        })
      } as any;
    });

    const response = await orderService.all();
    expect(response.length).toBe(1);
  });

  it('should find one order successfully', async () => {
    jest.spyOn(orderModel, 'findById').mockResolvedValue({
      ...ORDERS_MOCK[0],
      state: OrderState.DELIVERED
    } as unknown as OrderModel);

    const response = await orderService.findOne('60c6dbfd040f89585a7a8f11');
    expect(response.orderItems.length).toBe(1);
    expect(response.state).toBe(OrderState.DELIVERED);
  });

  it('should update order successfully', async () => {
    jest.spyOn(orderModel, 'findOneAndUpdate').mockImplementation((orderId, updateOrderDto) => {
      return {
        ...ORDERS_MOCK[0],
        ...updateOrderDto,
        _id: orderId
      } as any;
    });

    const updateOrderDto = {
      state: OrderState.CANCELLED
    } as UpdatedOrderDto;

    const response = await orderService.updateOrder('60c6dbfd040f89585a7a8f11', updateOrderDto);
    expect(response.state).toBe(OrderState.CANCELLED);
  });

  it('should cancel order by id successfully', async () => {
    jest.spyOn(orderModel, 'findById').mockResolvedValue(ORDERS_MOCK[0] as any);

    jest.spyOn(orderModel, 'findOneAndUpdate').mockImplementation((orderId) => {
      return {
        ...ORDERS_MOCK[0],
        state: OrderState.CANCELLED
      } as any;
    });

    const response = await orderService.cancelOrderById('60c6dbfd040f89585a7a8f11');
    expect(response.state).toBe(OrderState.CANCELLED);
  });
});

import { CreateOrderDto } from './../src/orders/dto/created-order.dto';
import { AppModule } from './../src/app.module';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { OrdersService } from '@orders/orders.service';
import { Order } from '@schemas';

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
    state: 'Delivered',
    createdDate: '2021-06-14T04:33:01.086Z',
    updatedDate: '2021-06-14T04:33:01.086Z'
  }
] as unknown as Order[];

describe('Orders', () => {
  let app: INestApplication;
  const orderService = {
    all: () => {
      return {
        data: ORDERS_MOCK
      };
    },
    findOne: () => {
      return ORDERS_MOCK[0];
    },
    create: () => {
      return {
        ...ORDERS_MOCK[0],
        state: 'Created'
      };
    }
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideProvider(OrdersService)
      .useValue(orderService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`GET /v1/api/orders`, () => {
    return request(app.getHttpServer()).get('/orders').expect(HttpStatus.OK).expect(orderService.all());
  });

  it(`GET /v1/api/orders/:id/status`, () => {
    const orderId = '60c720112badcc845396a807';
    return request(app.getHttpServer()).get(`/orders/${orderId}/status`).expect(HttpStatus.OK);
  });

  it(`POST /v1/api/orders`, () => {
    const payload = {
      orderItems: [
        {
          productName: 'React Advantages',
          productUrl: 'amazon.com/react-advantage',
          price: 50000,
          quantity: 2
        },
        {
          productName: 'NestJs For Beginner',
          productUrl: 'amazon.com/nest-js-beginner',
          price: 50000,
          quantity: 2
        }
      ],
      metadata: {
        customerName: 'Trung Nguyen',
        address: 'Ho Chi Minh',
        phoneNumber: '098562525',
        payMethod: 'Cash'
      }
    } as unknown as CreateOrderDto;

    return request(app.getHttpServer()).post(`/orders`).send(payload).expect(HttpStatus.CREATED);
  });

  afterAll(async () => {
    await app.close();
  });
});

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqps://hyyyfwsq:Znh8CHBdx4vZFBAajeD3xgWdKkqeOvwu@snake.rmq2.cloudamqp.com/hyyyfwsq'
        ],
        queue: 'payment_queue',
        queueOptions: {
          durable: false
        }
      }
    }
  );

  app.listen(() => console.log('Microservice is listening'));
}

bootstrap();

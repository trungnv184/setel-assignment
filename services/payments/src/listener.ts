import { RABBIT_MQ_URL } from '@configs/environment.config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [RABBIT_MQ_URL],
      queue: 'payment_queue',
      queueOptions: {
        durable: false
      }
    }
  });

  app.listen(() => console.log('Microservice is listening'));
}

bootstrap();

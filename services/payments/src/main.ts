import { RABBIT_MQ_URL } from '@configs/environment.config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1/api');
  app.enableCors({
    origin: 'http://localhost:3000'
  });

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [RABBIT_MQ_URL],
      queue: 'payment_queue',
      queueOptions: {
        durable: false
      }
    }
  });

  await app.startAllMicroservicesAsync();
  await app.listen(8001);
}
bootstrap();

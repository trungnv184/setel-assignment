import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1/api');
  app.enableCors({
    origin: 'http://localhost:3000'
  });

  const config = new DocumentBuilder()
    .setTitle('Order Service')
    .setDescription('The Order Service API Description')
    .setVersion('1.0')
    .addTag('Orders')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { urlencoded, json } from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // -- Allow large text to upload --
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  const options = new DocumentBuilder()
    .setTitle('Book API')
    .setDescription('The Open Books API')
    .setVersion('0.0.1')
    .addTag('books')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();

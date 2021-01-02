import { NestFactory } from '@nestjs/core';
import { urlencoded, json } from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LIMIT_REQ_SIZE, API_VERSION } from './config/book-api.config';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // -- Allow large text to upload --
  app.use(json({ limit: LIMIT_REQ_SIZE }));
  app.use(urlencoded({ extended: true, limit: LIMIT_REQ_SIZE }));

  const options = new DocumentBuilder()
    .setTitle('Book API')
    .setDescription(
      `Open Book API that provides the ability to add books to the 
      database and retrieve a list of books with optional pagination`,
    )
    .setVersion(API_VERSION)
    .addTag('books')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();

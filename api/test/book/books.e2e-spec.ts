import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { BooksModule } from '../../src/books/books.module';
import { typeOrmConfig } from '../../src/config/typeorm.config';
import { DEFAULT_BOOK_LIMIT } from '../../src/config/book-api.config';
import { CreateBookDto } from 'src/books/dto/create-book.dto';

typeOrmConfig.entities[0] = __dirname + '/../../**/*.entity.ts';

describe('[Feature] Books - /api/books', () => {
  let app: INestApplication;

  const testBook: CreateBookDto = {
    title: 'Test Title',
    author: 'Test Author',
    publishedYear: 2000,
    text: 'Lorem ipsum.',
  };

  const InvalidTestBook: CreateBookDto = {
    title: '',
    author: '',
    publishedYear: 10000,
    text: '',
  };

  const testBooksArray: CreateBookDto[] = new Array(DEFAULT_BOOK_LIMIT).fill(
    testBook,
  );

  beforeAll(async () => {
    const moduleBook: TestingModule = await Test.createTestingModule({
      imports: [BooksModule, TypeOrmModule.forRoot(typeOrmConfig)],
    }).compile();

    app = moduleBook.createNestApplication();
    await app.init();
  });

  testBooksArray.forEach((book, index) => {
    it(`Creates a book and return it [POST /api/books] iteration #: ${
      index + 1
    }`, () => {
      return request(app.getHttpServer())
        .post('/api/books')
        .send(book)
        .expect(HttpStatus.CREATED)
        .then(({ body }) => {
          const expectedBook = jasmine.objectContaining({ ...book });

          expect(body).toEqual(expectedBook);
        });
    });
  });

  it('Returns 400 bad request [POST /api/books] (empty body)', () => {
    return request(app.getHttpServer())
      .post('/api/books')
      .send()
      .expect(HttpStatus.BAD_REQUEST);
  });

  Object.entries(testBook).forEach(([key]) => {
    it(`Returns 400 bad request [POST /api/books] (invalid "${key}" property)`, () => {
      const corruptedTestBook = Object.assign({}, testBook);
      corruptedTestBook[key] = InvalidTestBook[key];

      return request(app.getHttpServer())
        .post('/api/books')
        .send(corruptedTestBook)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  Object.entries(testBook).forEach(([key]) => {
    it(`Returns 400 bad request [POST /api/books] (without "${key}" property)`, () => {
      const corruptedTestBook = Object.assign({}, testBook);
      delete corruptedTestBook[key];

      return request(app.getHttpServer())
        .post('/api/books')
        .send(corruptedTestBook)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  it('Returns an array of books [GET /api/books] (no query params)', () => {
    return request(app.getHttpServer())
      .get('/api/books')
      .send()
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        const expectedBooksArray = testBooksArray.map((book) => {
          return jasmine.objectContaining({ ...book });
        });

        expect(expectedBooksArray.length).toBe(testBooksArray.length);

        expect(body).toEqual(expectedBooksArray);
      });
  });

  it('Returns an array of books [GET /api/books?limit=5&start=5] (query params)', () => {
    return request(app.getHttpServer())
      .get('/api/books?limit=5&start=5')
      .send()
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body.length).toBe(5);

        expect(body[0].id).toBe(6);
      });
  });

  it('Returns an array of books [GET /api/books?limit=555&start=-550] (invalid query params will be changed to default)', () => {
    return request(app.getHttpServer())
      .get('/api/books?limit=555&start=-550')
      .send()
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body.length).toBe(DEFAULT_BOOK_LIMIT);
        expect(body[0].id).toBe(1);
      });
  });

  it('Returns 400 bad request [GET /api/books?limit=] (empty limit query param)', () => {
    return request(app.getHttpServer())
      .get('/api/books?limit=')
      .send()
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Returns 400 bad request [GET /api/books?start=] (empty start query param)', () => {
    return request(app.getHttpServer())
      .get('/api/books?start=')
      .send()
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Returns 400 bad request [GET /api/books?start=test] (start query param is not a number string)', () => {
    return request(app.getHttpServer())
      .get('/api/books?start=test')
      .send()
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Returns 400 bad request [GET /api/books?limit=test] (limit query param is not a number string)', () => {
    return request(app.getHttpServer())
      .get('/api/books?limit=test')
      .send()
      .expect(HttpStatus.BAD_REQUEST);
  });

  afterAll(async () => {
    await app.close();
  });
});

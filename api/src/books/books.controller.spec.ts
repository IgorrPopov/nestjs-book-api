import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let booksController: BooksController;
  let booksService: BooksService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    booksService = moduleRef.get<BooksService>(BooksService);
    booksController = moduleRef.get<BooksController>(BooksController);
  });

  describe('getBooks', () => {
    it('should return an array of getBooks', async () => {
      const result = ['test'];
      jest.spyOn(BooksService, 'getBooks').mockImplementation(() => result);

      expect(await BooksController.getBooks()).toBe(result);
    });
  });
});

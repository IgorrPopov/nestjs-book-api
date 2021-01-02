import { Test } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';

const mockBookService = () => ({
  getBooks: jest.fn(),
  createBook: jest.fn(),
});

const mockValue: string = 'Test value';

const mockCreateBookDto: CreateBookDto = {
  title: 'Test title',
  author: 'Test author',
  publishedYear: 2020,
  text: 'Test text',
};

const mockFilterDto: GetBooksFilterDto = { limit: 10, start: 30 };

describe('BooksController', () => {
  let booksService: any;
  let booksController: BooksController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BooksController,
        { provide: BooksService, useFactory: mockBookService },
      ],
    }).compile();

    booksService = module.get<BooksService>(BooksService);
    booksController = module.get<BooksController>(BooksController);
  });

  it('Should be defined', () => {
    expect(booksController).toBeDefined();
  });

  describe('getBooks', () => {
    it('Gets books from the service', async () => {
      booksService.getBooks.mockReturnValue(mockValue);

      expect(booksService.getBooks).not.toHaveBeenCalled();

      const result = booksController.getBooks(mockFilterDto);

      expect(booksService.getBooks).toHaveBeenCalledWith(mockFilterDto);

      expect(result).toEqual(mockValue);
    });
  });

  describe('createBook', () => {
    it('Passes the book to the service', async () => {
      booksService.createBook.mockReturnValue(mockValue);

      expect(booksService.createBook).not.toHaveBeenCalled();

      const result = booksController.createBook(mockCreateBookDto);

      expect(booksService.createBook).toHaveBeenCalledWith(mockCreateBookDto);
      expect(result).toEqual(mockValue);
    });
  });
});

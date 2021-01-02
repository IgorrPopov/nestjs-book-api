import { Test } from '@nestjs/testing';
import { BookRepository } from './book.repository';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';

const mockBookRepository = () => ({
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

describe('BooksService', () => {
  let booksService: BooksService;
  let bookRepository: any;

  // Init BooksServise & BookRepository
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: BookRepository, useFactory: mockBookRepository }, // useFactory - create every time an instance
      ],
    }).compile();

    booksService = module.get<BooksService>(BooksService);
    bookRepository = module.get<BookRepository>(BookRepository);
  });

  //   Tests
  it('Should be defined', () => {
    expect(booksService).toBeDefined();
  });

  describe('getBooks', () => {
    it('Gets books from the repository', async () => {
      bookRepository.getBooks.mockResolvedValue(mockValue);

      expect(bookRepository.getBooks).not.toHaveBeenCalled();

      const result = await booksService.getBooks(mockFilterDto);

      expect(bookRepository.getBooks).toHaveBeenCalledWith(mockFilterDto);
      expect(result).toEqual(mockValue);
    });
  });

  describe('createBook', () => {
    it('Add the book to the repository', async () => {
      bookRepository.createBook.mockResolvedValue(mockValue);

      expect(bookRepository.createBook).not.toHaveBeenCalled();

      const result = await booksService.createBook(mockCreateBookDto);

      expect(bookRepository.createBook).toHaveBeenCalledWith(mockCreateBookDto);
      expect(result).toEqual(mockValue);
    });
  });
});

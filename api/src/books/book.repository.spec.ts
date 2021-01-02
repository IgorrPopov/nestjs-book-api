import { InternalServerErrorException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';

const mockCreateBookDto: CreateBookDto = {
  title: 'Test title',
  author: 'Test author',
  publishedYear: 2020,
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

const mockFilterDto: GetBooksFilterDto = { limit: 10, start: 30 };

describe('BookRepository', () => {
  let bookRepository: BookRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BookRepository],
    }).compile();

    bookRepository = module.get<BookRepository>(BookRepository);
  });

  describe('createBook', () => {
    let save: any;

    beforeEach(() => {
      save = jest.fn();
      bookRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('Successfully create the book', () => {
      save.mockResolvedValue(undefined);
      expect(
        bookRepository.createBook(mockCreateBookDto),
      ).resolves.not.toThrow();
    });

    it('Throws an internal server error exception', () => {
      save.mockRejectedValue(new Error());
      expect(bookRepository.createBook(mockCreateBookDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getBooks', () => {
    let getMany: any;
    let skip: any;
    let take: any;

    beforeEach(() => {
      skip = jest.fn();
      take = jest.fn();
      getMany = jest.fn();

      take.mockReturnValue({ getMany });
      skip.mockReturnValue({ take });

      bookRepository.createQueryBuilder = jest.fn().mockReturnValue({ skip });
    });

    it('Successfully returns books', () => {
      getMany.mockResolvedValue(undefined);
      expect(bookRepository.getBooks(mockFilterDto)).resolves.not.toThrow();
      expect(skip).toHaveBeenCalledWith(mockFilterDto.start);
      expect(take).toHaveBeenCalledWith(mockFilterDto.limit);
    });

    it('Throws an internal server error exception', () => {
      getMany.mockRejectedValue(new Error());
      expect(bookRepository.getBooks(mockFilterDto)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(skip).toHaveBeenCalledWith(mockFilterDto.start);
      expect(take).toHaveBeenCalledWith(mockFilterDto.limit);
    });
  });
});

import { Test } from '@nestjs/testing';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto/create-book.dto';

const mockCreateBookDto: CreateBookDto = {
  title: 'Test title',
  author: 'Test author',
  publishedYear: 2020,
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

describe('BookRepository', () => {
  let bookRepository: BookRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BookRepository],
    }).compile();

    bookRepository = module.get<BookRepository>(BookRepository);
  });

  describe('createBook', () => {
    let save;

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
  });
});

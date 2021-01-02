import { EntityRepository, Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';
import { DEFAULT_BOOK_LIMIT } from '../config/book-api.config';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async getBooks(filterDto: GetBooksFilterDto): Promise<Book[]> {
    let { limit = DEFAULT_BOOK_LIMIT, start = 0 } = filterDto;

    if (typeof limit === 'string') limit = parseInt(limit);
    if (limit > DEFAULT_BOOK_LIMIT || limit <= 0) limit = DEFAULT_BOOK_LIMIT;
    if (typeof start === 'string') start = parseInt(start);

    if (start < 0) start = 0;

    const query = this.createQueryBuilder('book');

    try {
      const books = await query.skip(start).take(limit).getMany();
      return books;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { title, author, publishedYear, text } = createBookDto;

    const book = this.create();

    book.title = title;
    book.author = author;
    book.publishedYear = publishedYear;
    book.text = text;

    try {
      await book.save();
      return book;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

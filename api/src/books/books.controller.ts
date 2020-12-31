import { Query, ValidationPipe } from '@nestjs/common';
import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';

@Controller('api/books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getBooks(
    @Query(ValidationPipe) filetDto: GetBooksFilterDto,
  ): Promise<Book[]> {
    return this.booksService.getBooks(filetDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(createBookDto);
  }
}

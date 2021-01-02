import { Query, ValidationPipe } from '@nestjs/common';
import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';
import { DEFAULT_BOOK_LIMIT } from '../config/book-api.config';

@ApiTags('books')
@Controller('api/books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: `Returns an array of objects with books and a max 
    length of ${DEFAULT_BOOK_LIMIT}. You can add 'start=20' and 'limit=3' 
    optional query parameters but the limit must be ${DEFAULT_BOOK_LIMIT} or less`,
    type: [Book],
  })
  @ApiResponse({
    status: 400,
    description: `If the limit or start query params is empty or not a number 
    the API will send 400 bad request`,
  })
  getBooks(
    @Query(ValidationPipe) filetDto: GetBooksFilterDto,
  ): Promise<Book[]> {
    return this.booksService.getBooks(filetDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiBody({ type: CreateBookDto })
  @ApiResponse({
    status: 201,
    description: `Add one book instance and after it was created (added to the DB) 
    returns it as an object (JSON) (if you want to add a book that was written B.C. 
    add minus sign to the year).`,
    type: Book,
  })
  @ApiResponse({
    status: 400,
    description: `If the request body does not match CreateBookDto 
    then the API will return 400 bad request`,
  })
  createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(createBookDto);
  }
}

import { Query, ValidationPipe } from '@nestjs/common';
import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';

@ApiTags('books')
@Controller('api/books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  @ApiParam({
    type: GetBooksFilterDto,
    name: 'filter query',
    description: 'You can set limit (10 or less) start position.',
  })
  @ApiResponse({
    status: 200,
    description:
      "Returns an array of objects with books and max length of 10. You can add 'start=20' and 'limit=3' query parameters but limit must be 10 or less",
    type: [Book],
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
    description:
      'Add one book instance and after it was created (added to the DB) returns it as an object (JSON).',
    type: Book,
  })
  createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(createBookDto);
  }
}

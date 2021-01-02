import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { DEFAULT_BOOK_LIMIT } from '../../config/book-api.config';

export class GetBooksFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(3)
  @IsNumberString()
  @ApiProperty({
    name: 'limit',
    required: false,
    description: `Limit the number of books that the API will return. The limit has to be 
    ${DEFAULT_BOOK_LIMIT} or less. The limit is an optional parameter. If the limit is 
    omitted the API will return an array with ${DEFAULT_BOOK_LIMIT} books. If the limit 
    is bigger than ${DEFAULT_BOOK_LIMIT} or it's zero or less the limit will be set to 
    a default value (${DEFAULT_BOOK_LIMIT}). If the limit is empty or not a number 
    API will return 400 bad request`,
    example: 5,
  })
  limit: number;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(50)
  @IsNumberString()
  @ApiProperty({
    name: 'start',
    required: false,
    description: `Set start position of the first book in the database that will be 
    added to the array and return from the API. Optional parameter. If start=2 
    second element will also be skipped). If the start is empty or not a number API 
    will return 400 bad request`,
    example: 2,
  })
  start: number;
}

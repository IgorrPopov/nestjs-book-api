import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, MaxLength } from 'class-validator';
import { DEFAULT_BOOK_LIMIT } from '../../config/book-api.config';

export class GetBooksFilterDto {
  @IsOptional()
  @MaxLength(3)
  @IsNumberString()
  @ApiProperty({
    name: 'limit',
    required: false,
    description: `Limit the number of books that the api will return. Limit has to bee ${DEFAULT_BOOK_LIMIT} 
      or less (optional parameter, if limit omited the api will return an array with ${DEFAULT_BOOK_LIMIT} books).`,
    example: 5,
  })
  limit: number;

  @IsOptional()
  @MaxLength(3)
  @IsNumberString()
  @ApiProperty({
    name: 'start',
    required: false,
    description:
      'Set start position of the first book in the database that will be added to the array and return (optional parameter, if start=2 second element will also be skipped).',
    example: 2,
  })
  start: number;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { MAX_BOOK_TEXT_LENGHT } from '../../config/book-api.config';

export class CreateBookDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(500)
  @ApiProperty({ example: 'Iliad' })
  title: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(300)
  @ApiProperty({ example: 'Homer' })
  author: string;

  @IsNotEmpty()
  @IsInt()
  @Max(new Date().getFullYear())
  @Min(-5000)
  @ApiProperty({ example: -1180 })
  publishedYear: number;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(MAX_BOOK_TEXT_LENGHT)
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  })
  text: string;
}

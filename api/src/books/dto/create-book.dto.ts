import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(500)
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(300)
  @ApiProperty()
  author: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(4)
  @MaxLength(4)
  @ApiProperty()
  publishedYear: number;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(10000000)
  @ApiProperty()
  text: string;
}

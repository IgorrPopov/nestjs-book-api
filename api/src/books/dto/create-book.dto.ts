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
  title: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(300)
  author: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(4)
  @MaxLength(4)
  publishedYear: number;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(10000000)
  text: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

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
  // @IsNumberString()
  // @MinLength(4)
  // @MaxLength(4)
  @IsInt()
  @Max(new Date().getFullYear())
  @Min(-5000)
  @ApiProperty({ example: -1180 })
  publishedYear: number;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(10000000)
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  })
  text: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, MaxLength } from 'class-validator';

export class GetBooksFilterDto {
  @IsOptional()
  @MaxLength(3)
  @IsNumberString()
  @ApiProperty({
    required: false,
  })
  limit: number;

  @IsOptional()
  @MaxLength(3)
  @IsNumberString()
  @ApiProperty({
    required: false,
  })
  start: number;
}

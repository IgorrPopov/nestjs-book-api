import { IsNumberString, IsOptional, MaxLength } from 'class-validator';

export class GetBooksFilterDto {
  @IsOptional()
  @MaxLength(3)
  @IsNumberString()
  limit: number;

  @IsOptional()
  @MaxLength(3)
  @IsNumberString()
  start: number;
}

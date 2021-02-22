import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

/**
 * Part creation DTO
 */
export class UpdatePartLogDto {
  @IsNotEmpty()
  @IsString()
  partId: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  stock: number;
}

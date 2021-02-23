import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

/**
 * ProductLog creation DTO
 */
export class UpdateProductLogDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  built: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  used: number;
}

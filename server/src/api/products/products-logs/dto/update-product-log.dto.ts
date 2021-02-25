import { IsDate, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

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
  @Min(0)
  stock: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockBuilt: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockUsed: number;
}

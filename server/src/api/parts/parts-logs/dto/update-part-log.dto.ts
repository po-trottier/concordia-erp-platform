import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

/**
 * PartLog creation DTO
 */
export class UpdatePartLogDto {
  @IsNotEmpty()
  @IsString()
  partId: string;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stock: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockUsed: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockBuilt: number;
}

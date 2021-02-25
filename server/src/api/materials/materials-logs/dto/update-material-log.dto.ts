import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

/**
 * MaterialLog creation DTO
 */
export class UpdateMaterialLogDto {
  @IsNotEmpty()
  @IsString()
  materialId: string;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stock = 0;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockUsed = 0;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockBought = 0;
}

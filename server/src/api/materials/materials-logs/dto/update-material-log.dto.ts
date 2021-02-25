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
  stock: number = 0;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockUsed: number = 0;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockBought: number = 0;
}

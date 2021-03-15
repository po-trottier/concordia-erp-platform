import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

/**
 * Part stock update DTO
 */
export class UpdateMaterialStockDto {
  @IsNotEmpty()
  @IsString()
  materialId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockUsed: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockBought: number;
}

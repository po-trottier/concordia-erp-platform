import { IsInt, IsNotEmpty, Min } from 'class-validator';

/**
 * Part stock update DTO
 */
export class UpdateMaterialStockDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockUsed: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockBought: number;
}

import { IsInt, IsNotEmpty, Min } from 'class-validator';

/**
 * Product Stock DTO
 */
export class UpdateProductStockDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockUsed: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockBuilt: number;
}

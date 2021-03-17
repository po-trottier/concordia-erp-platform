import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

/**
 * Product Stock DTO
 */
export class UpdateProductStockDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockUsed: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockBuilt: number;
}

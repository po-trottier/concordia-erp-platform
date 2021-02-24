import { IsInt, IsNotEmpty, Min } from 'class-validator';

/**
 * Part creation DTO
 */
export class UpdatePartStockDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockUsed: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockBuilt: number;
}

import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

/**
 * Part stock update DTO
 */
export class UpdatePartStockDto {
  @IsNotEmpty()
  @IsString()
  partId : string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockUsed : number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockBuilt : number;
}

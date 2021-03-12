import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

/**
 * PartLog creation DTO
 */
export class UpdatePartLogDto {
  @IsNotEmpty()
  @IsString()
  partId: string;

  @IsNotEmpty()
  @IsString()
  locationId: string;

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
  stockBuilt = 0;
}

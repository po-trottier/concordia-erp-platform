import {IsOptional, IsString, IsInt, IsPositive, IsNotEmpty} from 'class-validator';

/**
 * Material update DTO
 */
export class UpdateMaterialDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  density: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  vendorName: string;

  @IsPositive()
  @IsOptional()
  price: number;
}

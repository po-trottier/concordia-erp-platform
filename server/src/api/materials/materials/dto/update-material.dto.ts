import {IsOptional, IsString, IsInt, IsPositive, IsNotEmpty, Min, IsNumber} from 'class-validator';

/**
 * Material update DTO
 */
export class UpdateMaterialDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  stock: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  density: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  vendorName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price: number;
}

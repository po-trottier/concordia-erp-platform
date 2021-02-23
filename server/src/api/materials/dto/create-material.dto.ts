import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsOptional,
} from 'class-validator';

/**
 * Material creation DTO
 */
export class CreateMaterialDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsPositive()
  stock: number;

  @IsPositive()
  density: number;

  @IsNotEmpty()
  @IsString()
  vendorName: string;

  @IsPositive()
  price: number;
}

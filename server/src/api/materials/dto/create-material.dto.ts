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
  description: string;

  @IsInt()
  @IsPositive()
  stock: number;

  @IsInt()
  @IsPositive()
  density: number;

  @IsNotEmpty()
  @IsString()
  vendorName: string;

  @IsPositive()
  price: number;
}

import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

/**
 * Material creation DTO
 */
export class CreateMaterialDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  stock = 0;

  @IsNumber()
  @IsPositive()
  density: number;

  @IsNotEmpty()
  @IsString()
  vendorName: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNumber()
  @IsPositive()
  price: number;
}

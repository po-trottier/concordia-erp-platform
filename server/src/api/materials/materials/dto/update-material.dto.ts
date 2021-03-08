import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

/**
 * Material update DTO
 */
export class UpdateMaterialDto {
  @IsString()
  @IsOptional()
  name: string;

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

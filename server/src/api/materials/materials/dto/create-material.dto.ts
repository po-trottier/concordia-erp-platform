import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

/**
 * Material creation DTO
 */
export class CreateMaterialDto {
  @IsNotEmpty()
  @IsString()
  name: string;

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

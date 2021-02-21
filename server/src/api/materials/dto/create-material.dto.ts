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

  @IsOptional()
  @IsInt()
  @IsPositive()
  stock: number;
}
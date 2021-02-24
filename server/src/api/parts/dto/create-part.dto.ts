import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsOptional,
  Min,
} from 'class-validator';
import { CreatePartMaterialDto } from './create-part-material.dto';

/**
 * Part creation DTO
 */
export class CreatePartDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  parts: CreatePartMaterialDto[];

  @Min(0)
  @IsInt()
  @IsOptional()
  stock = 0;
}

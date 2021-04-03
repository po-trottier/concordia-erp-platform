import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePartMaterialDto } from './create-part-material.dto';

/**
 * Part creation DTO
 */
export class CreatePartDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  materials: CreatePartMaterialDto[];
}

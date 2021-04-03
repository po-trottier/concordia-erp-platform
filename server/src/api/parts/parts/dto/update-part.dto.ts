import { IsOptional, IsString } from 'class-validator';
import { ProductMaterialInterface } from '../schemas/part.schema';

/**
 * Part update DTO
 */
export class UpdatePartDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  materials: ProductMaterialInterface[];
}

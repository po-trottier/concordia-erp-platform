import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

import { CreateProductPartDto } from './create-product-part.dto';
import { CreateProductPropertyDto } from './create-product-property.dto';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  price: number;

  @IsNotEmpty()
  @IsOptional()
  parts: CreateProductPartDto[];

  @IsOptional()
  properties: CreateProductPropertyDto[];
}

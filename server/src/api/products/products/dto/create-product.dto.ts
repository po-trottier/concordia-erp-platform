import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

import { CreateProductPartDto } from './create-product-part.dto';
import { CreateProductPropertyDto } from './create-product-property.dto';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  parts: CreateProductPartDto[];

  @IsOptional()
  properties: CreateProductPropertyDto[];
}

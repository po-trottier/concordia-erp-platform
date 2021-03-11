import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Min } from 'class-validator';

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

  @Min(0)
  @IsInt()
  @IsOptional()
  stock = 0;

  @IsOptional()
  properties: CreateProductPropertyDto[];
}

import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

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

  @Min(0)
  @IsInt()
  @IsOptional()
  stock: number = 0;

  @IsOptional()
  properties: CreateProductPropertyDto[];
}

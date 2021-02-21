import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsPositive()
  @IsNotEmpty()
  price: number;

  // Will become a Parts object
  @IsNotEmpty()
  parts: string[];

  @IsString()
  @IsNotEmpty()
  frameSize: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  finish: string;

  @IsString()
  @IsNotEmpty()
  grade: string;

  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  quantity?: number;
}

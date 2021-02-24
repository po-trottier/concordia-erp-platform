import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateProductPartDto {
  @IsString()
  @IsNotEmpty()
  partId: string;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  quantity: number;
}
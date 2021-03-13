import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class BuildProductDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsPositive()
  @IsNotEmpty()
  amount: number;
}

import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateOrderProductDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  quantity: number;
}

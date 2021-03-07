import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateOrderMaterialDto {
  @IsString()
  @IsNotEmpty()
  materialId: string;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  quantity: number;
}

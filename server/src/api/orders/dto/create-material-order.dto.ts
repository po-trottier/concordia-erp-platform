import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateMaterialOrderDto {
  @IsNotEmpty()
  @IsString()
  materialId: string;

  @IsNotEmpty()
  @IsString()
  locationId: string;

  @IsPositive()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  dateOrdered: Date;
}

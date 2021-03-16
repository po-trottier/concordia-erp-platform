import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateMaterialOrderDto {
  @IsNotEmpty()
  @IsString()
  materialId: string;

  @IsPositive()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  dateOrdered: Date;
}

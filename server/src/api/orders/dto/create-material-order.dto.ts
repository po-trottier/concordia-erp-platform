import {
  IsBoolean,
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

  @IsPositive()
  amountDue: number;

  @IsNotEmpty()
  dateOrdered: Date;

  @IsNotEmpty()
  dateDue: Date;

  @IsBoolean()
  isPaid: boolean;
}

import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductOrderDto {
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @IsNotEmpty()
  @IsString()
  productId: string;

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
  isPaid = false;
}

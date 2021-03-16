import {
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

  @IsNotEmpty()
  dateOrdered: Date;
}

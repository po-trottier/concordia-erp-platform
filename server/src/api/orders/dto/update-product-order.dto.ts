import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateProductOrderDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  locationId: string;

  @IsOptional()
  @IsPositive()
  @IsInt()
  quantity: number;

  @IsOptional()
  @IsPositive()
  amountDue: number;

  @IsOptional()
  @IsNotEmpty()
  dateOrdered: Date;

  @IsOptional()
  @IsNotEmpty()
  dateDue: Date;

  @IsOptional()
  @IsBoolean()
  isPaid: boolean;
}

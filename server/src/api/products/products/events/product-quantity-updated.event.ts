import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsPositive,
  IsDate,
} from 'class-validator';

export class ProductQuantityUpdatedEvent {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  stock: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  built: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  used: number;

  @IsNotEmpty()
  @IsDate()
  date: Date;
}

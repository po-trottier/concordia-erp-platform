import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { CreateProductOrderDto } from './create-product-order.dto';

export class CreateProductOrderListDto {
  @IsNotEmpty()
  orders: CreateProductOrderDto[];
}

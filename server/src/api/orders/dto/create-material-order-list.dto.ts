import { IsNotEmpty } from 'class-validator';
import { CreateMaterialOrderDto } from './create-material-order.dto';

export class CreateMaterialOrderListDto {
  @IsNotEmpty()
  orders: CreateMaterialOrderDto[];
}

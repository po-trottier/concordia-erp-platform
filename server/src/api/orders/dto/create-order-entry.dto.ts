import { IsNotEmpty, IsString } from 'class-validator';
import { CreateOrderMaterialDto } from './create-order-material.dto';
import { CreateOrderProductDto } from './create-order-product.dto';
import { CreateFinanceEntryDto } from '../../finance/dto/create-finance-entry.dto';

/**
 * Finance Entry creation DTO
 */
export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @IsNotEmpty()
  merchandise: CreateOrderMaterialDto[] | CreateOrderProductDto[];

  @IsNotEmpty()
  payment: CreateFinanceEntryDto;
}

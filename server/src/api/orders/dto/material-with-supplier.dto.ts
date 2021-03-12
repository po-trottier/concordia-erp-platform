import { CreateMaterialOrderDto } from './create-material-order.dto';

export class MaterialWithSupplierDto extends CreateMaterialOrderDto {
  supplierName: string;
}

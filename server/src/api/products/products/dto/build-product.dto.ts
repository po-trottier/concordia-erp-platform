import { IsNotEmpty, IsInt, IsPositive, IsString} from 'class-validator';

export class BuildProductDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  stockBuilt: number;

  @IsString()
  @IsNotEmpty()
  productId: string;
}

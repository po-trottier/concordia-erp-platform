import { IsNotEmpty, IsInt, IsPositive, IsString} from 'class-validator';

export class BuildProductDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  buildAmount: number;

  @IsString()
  @IsNotEmpty()
  productId: string;
}

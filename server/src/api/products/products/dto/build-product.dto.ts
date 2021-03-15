import { IsNotEmpty, IsInt, IsPositive} from 'class-validator';

export class BuildProductDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  stockBuilt: number;
}

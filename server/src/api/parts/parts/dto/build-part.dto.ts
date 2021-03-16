import { IsNotEmpty, IsInt, IsPositive} from 'class-validator';

export class BuildPartDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  stockBuilt: number;
}
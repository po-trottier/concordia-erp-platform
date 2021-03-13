import { IsNotEmpty, IsInt, Min} from 'class-validator';

export class BuildProductDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stockBuilt: number;
}

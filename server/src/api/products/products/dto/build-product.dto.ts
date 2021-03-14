import { IsNotEmpty, IsInt, Min} from 'class-validator';

export class BuildProductDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  stockBuilt: number;
}

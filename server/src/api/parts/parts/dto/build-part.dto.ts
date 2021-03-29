import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class BuildPartDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  stockBuilt : number;

  @IsString()
  @IsNotEmpty()
  partId : string;
}
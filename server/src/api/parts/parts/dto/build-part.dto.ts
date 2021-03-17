import {IsNotEmpty, IsInt, IsPositive, IsString} from 'class-validator';

export class BuildPartDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  buildAmount: number;

  @IsString()
  @IsNotEmpty()
  partId: string;
}
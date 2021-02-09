import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

/**
 * Part creation DTO
 */
export class CreatePartDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  stock: number;
}

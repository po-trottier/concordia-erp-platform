import { IsInt, IsNotEmpty, IsString, IsOptional, Min } from 'class-validator';

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

  @IsOptional()
  @IsInt()
  @Min(0)
  stock: number;
}

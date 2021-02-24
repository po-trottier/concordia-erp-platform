import { Min } from 'class-validator';
import { IsInt, IsNotEmpty, IsString, IsOptional } from 'class-validator';

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

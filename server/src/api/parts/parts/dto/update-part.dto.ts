import { IsOptional, IsString, IsInt, IsPositive } from 'class-validator';

/**
 * Part update DTO
 */
export class UpdatePartDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock: number;
}

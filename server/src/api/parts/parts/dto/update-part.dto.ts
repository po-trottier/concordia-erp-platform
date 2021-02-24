import { IsOptional, IsString, IsInt, Min } from 'class-validator';

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
  @Min(0)
  @IsOptional()
  stock: number;
}

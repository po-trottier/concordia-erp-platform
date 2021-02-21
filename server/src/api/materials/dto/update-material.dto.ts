import { IsOptional, IsString, IsInt, IsPositive } from 'class-validator';

/**
 * Material update DTO
 */
export class UpdateMaterialDto {
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

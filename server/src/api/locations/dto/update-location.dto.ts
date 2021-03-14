import { IsOptional, IsString } from 'class-validator';

/**
 * Location update DTO
 */
export class UpdateLocationDto {
  @IsOptional()
  @IsString()
  name: string;
}

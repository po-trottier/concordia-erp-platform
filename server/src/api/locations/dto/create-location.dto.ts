import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * Location creation DTO
 */
export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  address: string;
}

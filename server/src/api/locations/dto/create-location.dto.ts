import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Location creation DTO
 */
export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

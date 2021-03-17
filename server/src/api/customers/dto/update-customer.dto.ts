import { IsEmail, IsOptional, IsString } from 'class-validator';

/**
 * Customer update DTO
 */
export class UpdateCustomerDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;
}

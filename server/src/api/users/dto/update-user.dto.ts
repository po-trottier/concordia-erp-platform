import { IsOptional, IsString, IsInt } from 'class-validator';
import { Role } from '../../../exports/Roles';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  role: Role;
}

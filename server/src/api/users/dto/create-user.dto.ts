import { IsInt, IsNotEmpty, IsString, IsDefined } from 'class-validator';
import { Role } from '../../../enums/Roles';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsInt()
  role: Role;
}

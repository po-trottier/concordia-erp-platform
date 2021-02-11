import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsDefined,
  Matches,
} from 'class-validator';
import { Role } from '../../roles/roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsInt()
  role: Role;
}

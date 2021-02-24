import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsDefined,
  IsEmail,
  Matches,
  IsOptional,
} from 'class-validator';
import { Role } from '../../roles/roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  
  @IsNotEmpty()
  @IsString()
  firstName: string;
  
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
  
  @IsDefined()
  @IsInt()
  role: Role;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'The password needs to contain 1 uppercase character, 1 lowercase character, 1 number, 1 symbol, and be 8 characters long or more.',
  })
  password: string;
}

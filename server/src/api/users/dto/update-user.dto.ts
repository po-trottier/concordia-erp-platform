import { IsOptional, IsString, IsInt, Matches, IsEmail, IsNotEmpty } from "class-validator";
import { Role } from '../../roles/roles.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstName: string;
  
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName: string;
  
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'The password needs to contain 1 uppercase character, 1 lowercase character, 1 number, 1 symbol, and be 8 characters long or more.',
  })
  password: string;
  
  @IsOptional()
  @IsInt()
  role: Role;
}

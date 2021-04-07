import { IsEmail, IsNotEmpty } from 'class-validator';

export class PasswordForgottenDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

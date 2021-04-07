import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class PasswordResetDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'The password needs to contain 1 uppercase character, 1 lowercase character, 1 number, 1 symbol, and be 8 characters long or more.',
  })
  password: string;
}

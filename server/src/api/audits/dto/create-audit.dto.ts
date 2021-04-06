import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuditDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}

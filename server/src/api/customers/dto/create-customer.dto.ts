import { IsDefined, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsInt()
  sold: string;

  @IsNotEmpty()
  @IsInt()
  paid: string;

  @IsDefined()
  @IsInt()
  balance: string;
}

import { IsDefined, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsInt()
  sold: number;

  @IsNotEmpty()
  @IsInt()
  paid: number;

  @IsDefined()
  @IsInt()
  balance: number;
}

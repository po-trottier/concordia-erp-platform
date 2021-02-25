import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductPropertyDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

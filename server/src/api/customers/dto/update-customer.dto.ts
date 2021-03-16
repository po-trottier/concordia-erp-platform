import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

/**
 * Customer update DTO
 */
export class UpdateCustomerDto {
  @IsString()
  @IsOptional()
  company: string;

  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  sold: number;

  @IsNotEmpty()
  @IsPositive()
  @IsOptional()
  paid: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  balance: number;
}

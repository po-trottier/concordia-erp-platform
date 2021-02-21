import {
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

/**
 * Finance Entry creation DTO
 */
export class CreateFinanceEntryDto {
  @IsNotEmpty()
  dateEntered: Date;

  @IsNotEmpty()
  dateDue: Date;

  @IsNotEmpty()
  @IsString()
  company_name: string;

  @IsPositive()
  amount: number;

  @IsPositive()
  paid: number;
}

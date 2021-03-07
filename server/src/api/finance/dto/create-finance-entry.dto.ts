import { IsNotEmpty, IsString } from 'class-validator';

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

  amount: number;

  paid: number;
}

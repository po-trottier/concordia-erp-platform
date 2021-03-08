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
  companyName: string;

  amount: number;

  paid: number;
}

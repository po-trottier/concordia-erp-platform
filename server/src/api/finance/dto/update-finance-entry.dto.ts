import { IsNotEmpty, IsPositive } from 'class-validator';

/**
 * FinanceEntry update DTO
 */
export class UpdateFinanceEntryDto {
  @IsNotEmpty()
  dateDue: Date;

  @IsPositive()
  paid: number;
}

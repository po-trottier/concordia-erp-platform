import { IsNotEmpty, IsPositive } from 'class-validator';

/**
 * Finentry update DTO
 */
export class UpdateFinentryDto {
  @IsNotEmpty()
  dateDue: Date;

  @IsPositive()
  paid: number;
}

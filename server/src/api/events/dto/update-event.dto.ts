import { IsArray, IsOptional, IsString } from 'class-validator';

/**
 * Event update DTO
 */
export class UpdateEventDto {
  @IsOptional()
  @IsString()
  eventId: string;

  @IsOptional()
  @IsArray()
  customerId: string[];

  @IsOptional()
  @IsArray()
  userId: string[];

  @IsOptional()
  @IsArray()
  role: number[];
}

import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../../roles/roles.enum';

/**
 * Event update DTO
 */
export class UpdateEventDto {
  @IsOptional()
  @IsString()
  eventId: string;

  @IsOptional()
  @IsString()
  customerId: string;

  @IsOptional()
  @IsString()
  userId: string;

  @IsOptional()
  @IsEnum(Role)
  roleId: string;
}

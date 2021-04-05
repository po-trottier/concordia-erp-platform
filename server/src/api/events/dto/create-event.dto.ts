import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Role } from '../../roles/roles.enum';

export class CreateEventDto {
  @IsNotEmpty()
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

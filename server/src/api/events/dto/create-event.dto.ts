import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
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

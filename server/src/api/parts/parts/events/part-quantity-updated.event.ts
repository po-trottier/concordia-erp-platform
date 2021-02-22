import { IsNotEmpty, IsString, IsInt, IsPositive } from 'class-validator';

export class PartQuantityUpdatedEvent {
  @IsNotEmpty()
  @IsString()
  partId: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  stock: number;

  @IsNotEmpty()
  @IsString()
  date: string;
}

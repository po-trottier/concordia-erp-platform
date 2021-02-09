import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateFinanceEntry {
  @IsNotEmpty
  @IsString
  date : string,

  @IsNotEmpty
  @IsString
  dateDue : string,


  @IsNotEmpty
  @IsPositive
  billed : number,

  @IsNotEmpty
  @IsPositive
  paid : number,

  @IsNotEmpty
  @IsPositive
  buyer : string,
}

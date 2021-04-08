import { IsDate, IsOptional, IsString } from 'class-validator';

export class QueryAuditDto {
  @IsString()
  @IsOptional()
  module: string;

  @IsString()
  @IsOptional()
  action: string;

  @IsString()
  @IsOptional()
  target: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsDate()
  @IsOptional()
  before: Date;

  @IsDate()
  @IsOptional()
  after: Date;
}

import {IsOptional, IsString} from "class-validator";
import {AuditActions} from "../audit.actions.enum";

export class QueryAuditDto {
  @IsString()
  @IsOptional()
  module: string;

  @IsString()
  @IsOptional()
  action: string;

  @IsOptional()
  date: Date;

  @IsString()
  @IsOptional()
  target: string;

  @IsString()
  @IsOptional()
  author: string;
}
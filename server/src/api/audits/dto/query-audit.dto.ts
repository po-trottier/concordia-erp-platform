import {IsOptional, IsString} from "class-validator";
import {AuditActions} from "../audit.actions.enum";

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

  @IsOptional()
  before: Date;

  @IsOptional()
  after: Date;
}
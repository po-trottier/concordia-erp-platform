import { IsDate, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsPositive()
    @IsOptional()
    price: number;

    // Will become a parts object
    @IsOptional()
    parts : string[];

    @IsString()
    @IsOptional()
    frameSize : string;

    @IsString()
    @IsOptional()
    color : string;

    @IsString()
    @IsOptional()
    finish : string;

    @IsString()
    @IsOptional()
    grade : string;

    @IsDate()
    @IsOptional()
    dateManufactured: Date;

    @IsDate()
    @IsOptional()
    dateSold?: Date;
}
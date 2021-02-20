import { IsInt, IsNotEmpty, IsOptional, isPositive, IsPositive, IsString, IsDecimal, IsDate } from "class-validator";


export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsPositive()
    @IsNotEmpty()
    price: number;

    // Will become a Parts object
    @IsNotEmpty()
    parts : string[];

    @IsString()
    @IsNotEmpty()
    frameSize : string;

    @IsString()
    @IsNotEmpty()
    color : string;

    @IsString()
    @IsNotEmpty()
    finish : string;

    @IsString()
    @IsNotEmpty()
    grade : string;

    @IsDate()
    @IsOptional()
    dateManufactured: Date;

    @IsDate()
    @IsOptional()
    dateSold?: Date;
}
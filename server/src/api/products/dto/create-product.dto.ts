import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";


export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    quantity: number;
}
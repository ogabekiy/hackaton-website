import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    season_number: number;

    @IsDate()
    @IsOptional()
    @Type(() => Date) 
    event_date?: Date; 

    @IsDate()
    @IsOptional()
    @Type(() => Date) 
    timer_end?: Date; 
}

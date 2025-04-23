import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMediaDto {
    @IsNumber()
    @IsNotEmpty()
    event_id: number;

    @IsString()
    @IsNotEmpty()
    url: string;
}

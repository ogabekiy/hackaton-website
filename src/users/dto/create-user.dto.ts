import { Transform, Type } from "class-transformer";
import { IsDate, IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    surname: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{9}$/, { message: "Telefon raqami faqat 9 ta raqamdan iborat bo‘lishi kerak." })
    phone_number: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsDate()
    @IsOptional()
    @Type(() => Date) 
    birthday?: Date; 

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    profile_photo: string;

    @IsString()
    @IsOptional() 
    @IsIn(['user', 'admin'], { message: "Role faqat user yoki admin bo‘lishi mumkin." })
    @Transform(({ value }) => value || 'user') 
    role?: string;
}

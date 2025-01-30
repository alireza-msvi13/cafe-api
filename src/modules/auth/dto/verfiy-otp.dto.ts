import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, Length } from "class-validator";
const errorMessage = "phone number is not correct";


export class VerfiyOtpDto {
    @IsNotEmpty({ message: errorMessage })
    @IsPhoneNumber('IR', { message: errorMessage })
    @ApiProperty({
        title: "enter phone number for login",
        example: "09254652258",
        nullable: false
    })
    phone: string;

    @ApiProperty({
        type: 'string',
        example: 12345,
    })
    otpCode: string;
}
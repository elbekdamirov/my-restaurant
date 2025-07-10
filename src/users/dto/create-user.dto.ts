import { IsString, IsEmail, MinLength, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    example: "Elbek Damirov",
    description: "Foydalanuvchining to‘liq ismi",
  })
  @IsString()
  full_name: string;

  @ApiProperty({
    example: "elbek@example.com",
    description: "Foydalanuvchining email manzili",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "qwerty123",
    description: "Parol (kamida 6 ta belgidan iborat)",
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: "qwerty123",
    description: "Parol (kamida 6 ta belgidan iborat)",
  })
  @IsString()
  @MinLength(6)
  confirm_password: string;

  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  @IsString()
  phone: string;

  @ApiProperty({
    example: "admin",
    description: "Foydalanuvchiga berilgan dastlabki role",
  })
  @IsString()
  @IsNotEmpty()
  value: string;
}

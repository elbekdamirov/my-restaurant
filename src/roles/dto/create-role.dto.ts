import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({
    example: "ADMIN",
    description: "Rol nomi (masalan: ADMIN, USER, MODERATOR)",
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    example: "Administrator huquqlari bilan foydalanuvchi",
    description: "Rol tavsifi",
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}

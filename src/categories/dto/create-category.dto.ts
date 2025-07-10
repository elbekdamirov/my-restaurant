import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({
    example: "Fast Food",
    description: "Kategoriya nomi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Tez tayyorlanadigan ovqatlar kategoriyasi",
    description: "Kategoriya haqida qisqacha tavsif",
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}

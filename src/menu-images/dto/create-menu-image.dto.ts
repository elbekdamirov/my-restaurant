import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateMenuImageDto {
  @ApiProperty({
    example: 3,
    description: "ID of the menu item this image belongs to",
  })
  @IsInt()
  @IsNotEmpty()
  menuId: number;

  @ApiProperty({
    example: "https://cdn.example.com/images/menu/burger.jpg",
    description: "URL of the image for the menu item",
  })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  image_url: string;
}

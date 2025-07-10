import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateMenuDto {
  @ApiProperty({
    example: 1,
    description: "ID of the restaurant this menu item belongs to",
  })
  @IsInt()
  @IsNotEmpty()
  restaurantId: number;

  @ApiProperty({
    example: 2,
    description: "ID of the category this menu item falls under",
  })
  @IsInt()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({
    example: "Classic Cheeseburger",
    description: "Name of the menu item",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Juicy beef patty with cheese, lettuce, and tomato",
    description: "Detailed description of the menu item",
  })
  @IsString()
  @IsNotEmpty()
  descriptions: string;

  @ApiProperty({
    example: true,
    description: "Whether this menu item is currently available",
  })
  @IsBoolean()
  is_available: boolean;
}

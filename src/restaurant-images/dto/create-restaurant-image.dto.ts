import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateRestaurantImageDto {
  @ApiProperty({
    example: 1,
    description: "ID of the restaurant the image belongs to",
  })
  @IsInt()
  @IsNotEmpty()
  restaurantId: number;

  @ApiProperty({
    example: "https://cdn.example.com/images/restaurant123.jpg",
    description: "URL of the restaurant image",
  })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  img_url: string;
}

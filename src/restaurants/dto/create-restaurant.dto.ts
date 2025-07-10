import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRestaurantDto {
  @ApiProperty({
    example: "Burger House",
    description: "The name of the restaurant",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "A fast-food place specializing in burgers and fries",
    description: "Brief description of the restaurant",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 1,
    description: "ID of the restaurant owner (must be a valid user ID)",
  })
  @IsNumber()
  @IsNotEmpty()
  ownerId: number;
}

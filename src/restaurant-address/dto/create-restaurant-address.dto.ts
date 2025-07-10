import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRestaurantAddressDto {
  @ApiProperty({
    example: 1,
    description: "ID of the restaurant this address belongs to",
  })
  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @ApiProperty({
    example: "Downtown Branch",
    description: "Name of the restaurant address or branch",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "123 Main Street, Tashkent",
    description: "Full physical address of the restaurant",
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: "41.2995, 69.2401",
    description: "GPS coordinates or location string",
  })
  @IsString()
  @IsNotEmpty()
  location: string;
}

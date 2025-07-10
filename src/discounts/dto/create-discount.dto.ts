import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  Min,
  Max,
} from "class-validator";

export class CreateDiscountDto {
  @ApiProperty({
    example: 1,
    description: "Menu ID to apply the discount to",
  })
  @IsInt()
  @IsNotEmpty()
  menuId: number;

  @ApiProperty({
    example: 2,
    description: "Restaurant ID associated with the menu",
  })
  @IsInt()
  @IsNotEmpty()
  restaurantId: number;

  @ApiProperty({
    example: 20,
    description: "Discount percentage (0 - 100)",
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  discount_percent: number;

  @ApiProperty({
    example: "2025-07-08T00:00:00.000Z",
    description: "Start date for the discount validity",
  })
  @IsDateString()
  valid_from: Date;

  @ApiProperty({
    example: "2025-07-15T00:00:00.000Z",
    description: "End date for the discount validity",
  })
  @IsDateString()
  valid_to: Date;
}

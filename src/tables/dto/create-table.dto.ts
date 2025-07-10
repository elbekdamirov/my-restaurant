import { IsBoolean, IsInt, IsNotEmpty, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTableDto {
  @ApiProperty({
    example: 1,
    description: "The ID of the restaurant this table belongs to",
  })
  @IsInt()
  @IsNotEmpty()
  restaurantId: number;

  @ApiProperty({
    example: 12,
    description: "The number assigned to this table",
  })
  @IsInt()
  @IsNotEmpty()
  table_number: number;

  @ApiProperty({
    example: 4,
    description: "Number of seats available at this table",
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  seats: number;

  @ApiProperty({
    example: true,
    description: "Indicates if the table is currently available",
  })
  @IsBoolean()
  @IsNotEmpty()
  is_available: boolean;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Min, Max } from "class-validator";

export class CreateReviewDto {
  @ApiProperty({
    example: 1,
    description: "User ID submitting the review",
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 2,
    description: "Restaurant ID the review is for",
  })
  @IsInt()
  @IsNotEmpty()
  restaurantId: number;

  @ApiProperty({
    example: 5,
    description: "Rating score from 1 to 5",
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    example: "Fantastic experience, highly recommended!",
    description: "Text comment about the restaurant",
  })
  @IsString()
  @IsNotEmpty()
  comment: string;
}

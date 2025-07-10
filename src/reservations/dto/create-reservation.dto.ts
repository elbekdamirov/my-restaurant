import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsInt, IsNotEmpty, Min } from "class-validator";
import { ReservationStatus } from "../models/reservation.models";

export class CreateReservationDto {
  @ApiProperty({
    example: 1,
    description: "ID of the customer making the reservation",
  })
  @IsInt()
  @IsNotEmpty()
  customerId: number;

  @ApiProperty({
    example: 5,
    description: "ID of the reserved table",
  })
  @IsInt()
  @IsNotEmpty()
  tableId: number;

  @ApiProperty({
    example: 2,
    description: "ID of the restaurant",
  })
  @IsInt()
  @IsNotEmpty()
  restaurantId: number;

  @ApiProperty({
    example: "2025-08-15T18:30:00.000Z",
    description: "Reservation date and time (ISO 8601 format)",
  })
  @IsDateString()
  @IsNotEmpty()
  reservation_time: Date;

  @ApiProperty({
    example: ReservationStatus.PENDING,
    enum: ReservationStatus,
    description: "Reservation status",
  })
  @IsEnum(ReservationStatus)
  status: ReservationStatus;

  @ApiProperty({
    example: 4,
    description: "Number of guests for the reservation",
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  guest_count: number;
}

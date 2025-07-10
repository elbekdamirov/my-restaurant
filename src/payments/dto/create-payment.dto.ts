import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsDateString,
  IsInt,
} from "class-validator";
import { PaymentMethod, PaymentStatus } from "../models/payment.models";

export class CreatePaymentDto {
  @ApiProperty({
    example: 1,
    description: "ID of the reservation associated with the payment",
  })
  @IsInt()
  @IsNotEmpty()
  reservationId: number;

  @ApiProperty({
    example: 49.99,
    description: "Payment amount in USD or relevant currency",
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: PaymentMethod.CARD,
    enum: PaymentMethod,
    description: "Payment method used",
  })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  payment_method: PaymentMethod;

  @ApiProperty({
    example: "2025-08-15T18:45:00.000Z",
    description: "Date and time the payment was made (ISO format)",
  })
  @IsDateString()
  @IsNotEmpty()
  payment_time: Date;

  @ApiProperty({
    example: PaymentStatus.SUCCESS,
    enum: PaymentStatus,
    description: "Current status of the payment",
  })
  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  status: PaymentStatus;
}

import { Module } from "@nestjs/common";
import { ReservationsService } from "./reservations.service";
import { ReservationsController } from "./reservations.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Reservation } from "./models/reservation.models";

@Module({
  imports: [SequelizeModule.forFeature([Reservation])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}

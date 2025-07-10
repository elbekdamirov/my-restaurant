import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { Reservation } from "./models/reservation.models";

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation)
    private reservationModel: typeof Reservation
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    return this.reservationModel.create(createReservationDto);
  }

  async findAll() {
    return this.reservationModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const reservation = await this.reservationModel.findByPk(id, {
      include: { all: true },
    });

    if (!reservation) {
      throw new NotFoundException(`Reservation with id ${id} not found`);
    }

    return reservation;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.findOne(id);
    return reservation.update(updateReservationDto);
  }

  async remove(id: number) {
    const reservation = await this.findOne(id);
    await reservation.destroy();
    return { message: "Reservation deleted successfully" };
  }
}

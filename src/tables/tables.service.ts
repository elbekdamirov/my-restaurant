import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateTableDto } from "./dto/create-table.dto";
import { UpdateTableDto } from "./dto/update-table.dto";
import { Tables } from "./models/table.model";
import {
  Reservation,
  ReservationStatus,
} from "../reservations/models/reservation.models";
import { Op } from "sequelize";
import sequelize from "sequelize";

@Injectable()
export class TablesService {
  constructor(
    @InjectModel(Tables)
    private tablesModel: typeof Tables
  ) {}

  async create(createTableDto: CreateTableDto) {
    return this.tablesModel.create(createTableDto);
  }

  async findAll() {
    return this.tablesModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const table = await this.tablesModel.findByPk(id, {
      include: { all: true },
    });

    if (!table) {
      throw new NotFoundException(`Table with id ${id} not found`);
    }

    return table;
  }

  async update(id: number, updateTableDto: UpdateTableDto) {
    const table = await this.findOne(id);
    return table.update(updateTableDto);
  }

  async remove(id: number) {
    const table = await this.findOne(id);
    await table.destroy();
    return { message: "Table deleted successfully" };
  }

  async findAvailableTablesBySeats(seats: number) {
    return this.tablesModel.findAll({
      where: {
        is_available: true,
        seats: {
          [Op.gte]: seats,
        },
      },
    });
  }
}

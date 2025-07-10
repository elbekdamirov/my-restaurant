import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../../users/model/user.model";
import { Tables } from "../../tables/models/table.model";
import { Restaurant } from "../../restaurants/models/restaurant.models";

export enum ReservationStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

interface IReservationCreationAttr {
  customerId: number;
  tableId: number;
  restaurantId: number;
  reservation_time: Date;
  status: ReservationStatus;
  guest_count: number;
}

@Table({ tableName: "reservations" })
export class Reservation extends Model<Reservation, IReservationCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  customerId: number;

  @BelongsTo(() => User)
  customer: User;

  @ForeignKey(() => Tables)
  @Column({ type: DataType.INTEGER, allowNull: false })
  tableId: number;

  @BelongsTo(() => Tables)
  table: Tables;

  @ForeignKey(() => Restaurant)
  @Column({ type: DataType.INTEGER, allowNull: false })
  restaurantId: number;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @Column({ type: DataType.DATE, allowNull: false })
  declare reservation_time: Date;

  @Column({
    type: DataType.ENUM(...Object.values(ReservationStatus)),
    allowNull: false,
    defaultValue: ReservationStatus.PENDING,
  })
  declare status: ReservationStatus;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare guest_count: number;
}

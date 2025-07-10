import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Reservation } from "../../reservations/models/reservation.models";

export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum PaymentMethod {
  CARD = "CARD",
  CASH = "CASH",
  CLICK = "CLICK",
  PAYME = "PAYME",
}

interface IPaymentCreationAttr {
  reservationId: number;
  amount: number;
  payment_method: PaymentMethod;
  payment_time: Date;
  status: PaymentStatus;
}

@Table({ tableName: "payments" })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Reservation)
  @Column({ type: DataType.INTEGER, allowNull: false })
  reservationId: number;

  @BelongsTo(() => Reservation)
  reservation: Reservation;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  amount: number;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentMethod)),
    allowNull: false,
  })
  payment_method: PaymentMethod;

  @Column({ type: DataType.DATE, allowNull: false })
  payment_time: Date;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentStatus)),
    allowNull: false,
    defaultValue: PaymentStatus.PENDING,
  })
  status: PaymentStatus;
}

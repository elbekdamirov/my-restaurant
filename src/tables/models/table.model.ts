import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Restaurant } from "../../restaurants/models/restaurant.models";

interface ITablesCreationAttr {
  restaurantId: number;
  table_number: number;
  seats: number;
  is_available: boolean;
}

@Table({ tableName: "tables" })
export class Tables extends Model<Tables, ITablesCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Restaurant)
  @Column({ type: DataType.INTEGER, allowNull: false })
  restaurantId: number;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare table_number: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare seats: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  declare is_available: boolean;
}

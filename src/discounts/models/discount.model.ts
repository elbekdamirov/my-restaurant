import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Menu } from "../../menus/models/menu.model";
import { Restaurant } from "../../restaurants/models/restaurant.models";

interface IDiscountCreationAttr {
  menuId: number;
  restaurantId: number;
  discount_percent: number;
  valid_from: Date;
  valid_to: Date;
}

@Table({ tableName: "discounts" })
export class Discount extends Model<Discount, IDiscountCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Menu)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare menuId: number;

  @BelongsTo(() => Menu)
  menu: Menu;

  @ForeignKey(() => Restaurant)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare restaurantId: number;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 100,
    },
  })
  declare discount_percent: number;

  @Column({ type: DataType.DATE, allowNull: false })
  declare valid_from: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  declare valid_to: Date;
}

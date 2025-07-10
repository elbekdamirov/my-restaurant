import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Restaurant } from "../../restaurants/models/restaurant.models";
import { Category } from "../../categories/models/category.model";

interface IMenusCreationAttr {
  restaurantId: number;
  categoryId: number;
  name: string;
  descriptions: string;
  is_available: boolean;
}

@Table({ tableName: "menus" })
export class Menu extends Model<Menu, IMenusCreationAttr> {
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

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare descriptions: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_available: boolean;
}

import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Restaurant } from "../../restaurants/models/restaurant.models";

interface IRestaurantImageCreationAttr {
  restaurantId: number;
  img_url: string;
}

@Table({ tableName: "restaurant_images" })
export class RestaurantImage extends Model<
  RestaurantImage,
  IRestaurantImageCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Restaurant)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare restaurantId: number;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @Column({ type: DataType.STRING, allowNull: false })
  declare img_url: string;
}

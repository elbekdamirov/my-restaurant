import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Restaurant } from "../../restaurants/models/restaurant.models";

interface IRestaurantAddressCreationAttr {
  restaurantId: number;
  name: string;
  address: string;
  location: string;
}

@Table({ tableName: "restaurant_addresses" })
export class RestaurantAddress extends Model<
  RestaurantAddress,
  IRestaurantAddressCreationAttr
> {
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

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare address: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare location: string;
}

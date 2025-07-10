import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { User } from "../../users/model/user.model";
import { RestaurantAddress } from "../../restaurant-address/models/restaurant-address.model";
import { Tables } from "../../tables/models/table.model";

interface IRestaurantCreationAttr {
  name: string;
  description: string;
  ownerId: number;
}

@Table({ tableName: "restaurants" })
export class Restaurant extends Model<Restaurant, IRestaurantCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  ownerId: number;

  @BelongsTo(() => User)
  owner: User;

  @HasMany(() => RestaurantAddress)
  addresses: RestaurantAddress[];

  @HasMany(() => Tables)
  tables: Tables[];
}

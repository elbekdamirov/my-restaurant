import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../../users/model/user.model";
import { Restaurant } from "../../restaurants/models/restaurant.models";

interface IReviewCreationAttr {
  userId: number;
  restaurantId: number;
  rating: number;
  comment: string;
}

@Table({ tableName: "reviews" })
export class Review extends Model<Review, IReviewCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Restaurant)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare restaurantId: number;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 },
  })
  declare rating: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare comment: string;
}

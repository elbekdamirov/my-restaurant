import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";

interface ICategoryCreationAttr {
  name: string;
  description: string;
}

@Table({ tableName: "categories" })
export class Category extends Model<Category, ICategoryCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;

  //   @HasMany(() => Menu)
  //   menus: Menu[];
}

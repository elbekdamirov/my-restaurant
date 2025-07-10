import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Menu } from "../../menus/models/menu.model";

interface IMenuImageCreationAttr {
  menuId: number;
  image_url: string;
}

@Table({ tableName: "menu_images" })
export class MenuImage extends Model<MenuImage, IMenuImageCreationAttr> {
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

  @Column({ type: DataType.STRING, allowNull: false })
  declare image_url: string;
}

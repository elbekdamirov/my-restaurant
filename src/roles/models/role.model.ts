import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { UserRole } from "../../users/model/user-role.model";
import { User } from "../../users/model/user.model";

interface IRoleCreationAttr {
  value: string;
  description: string;
}

@Table({ tableName: "roles", timestamps: true })
export class Role extends Model<Role, IRoleCreationAttr> {
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
  declare value: string;

  @Column({
    type: DataType.TEXT,
  })
  declare description: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}

import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import { Role } from "../../roles/models/role.model";
import { UserRole } from "./user-role.model";

interface IUsersCreationAttr {
  full_name: string;
  email: string;
  password: string;
  phone: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUsersCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare full_name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare phone: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;

  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare activation_link: string;

  @Column({ type: DataType.STRING(2500) })
  declare refresh_token: string;

  @BelongsToMany(() => Role, () => UserRole)
  declare roles: Role[];
}

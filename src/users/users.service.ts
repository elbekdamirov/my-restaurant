import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./model/user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RolesService } from "../roles/roles.service";
import * as bcrypt from "bcrypt";
import { Role } from "../roles/models/role.model";
import { AddRoleDto } from "./dto/add-role.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly roleService: RolesService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, confirm_password } = createUserDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    const hashed_password = await bcrypt.hash(password, 7);

    const role = await this.roleService.findRoleByValue(createUserDto.value);
    if (!role) {
      throw new NotFoundException("Bunday role mavjud emas");
    }
    const user = await this.userModel.create({
      ...createUserDto,
      password: hashed_password,
    });
    await user.$set("roles", [role.id]);

    return user?.dataValues;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id, {
      include: {
        model: Role,
        attributes: ["value"],
        through: { attributes: [] },
      },
    });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: { email },
      include: {
        model: Role,
        attributes: ["value"],
        through: { attributes: [] },
      },
    });
    return user?.dataValues;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    return await user.update(updateUserDto);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async removeRole(addRoleDto: AddRoleDto) {
    const user = await this.userModel.findByPk(addRoleDto.userId);
    if (!user) {
      throw new BadRequestException("Bunday foydalanuvchi mavjud emas");
    }

    const role = await this.roleService.findRoleByValue(addRoleDto.value);
    if (!role) {
      throw new NotFoundException("Bunday role mavjud emas");
    }

    await user.$remove("roles", role.id);

    const updatedUser = await this.userModel.findByPk(addRoleDto.userId, {
      include: { all: true },
    });
    return updatedUser;
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    const updatedUser = await this.userModel.update(
      { refresh_token },
      { where: { id } }
    );
    return updatedUser;
  }

  async activateUser(activation_link: string) {
    if (!activation_link) {
      throw new BadRequestException("Activate link not found");
    }

    const updatedUser = await this.userModel.update(
      { is_active: true },
      {
        where: {
          activation_link,
          is_active: false,
        },
        returning: true,
      }
    );
    if (!updatedUser[1][0]) {
      throw new BadRequestException("User already activated");
    }
    return {
      message: "User activated succesfully",
    };
  }
}

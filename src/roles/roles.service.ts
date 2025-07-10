import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./models/role.model";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleModel: typeof Role) {}

  create(createRoleDto: CreateRoleDto) {
    return this.roleModel.create({
      ...createRoleDto,
      value: createRoleDto.value.toUpperCase(),
    });
  }

  findAll() {
    return this.roleModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.roleModel.findByPk(id, { include: { all: true } });
  }

  findRoleByValue(value: string) {
    return this.roleModel.findOne({ where: { value: value.toUpperCase() } });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role.update({
      ...updateRoleDto,
      value: updateRoleDto.value?.toUpperCase() ?? role.value,
    });
  }

  async remove(id: number) {
    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    await role.destroy();
    return { message: `Role with ID ${id} deleted successfully` };
  }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Menu } from "./models/menu.model";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";

@Injectable()
export class MenusService {
  constructor(
    @InjectModel(Menu)
    private readonly menuModel: typeof Menu
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    return this.menuModel.create(createMenuDto);
  }

  async findAll() {
    return this.menuModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const menu = await this.menuModel.findByPk(id, {
      include: { all: true },
    });

    if (!menu) {
      throw new NotFoundException(`Menu with id ${id} not found`);
    }

    return menu;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.findOne(id);
    return menu.update(updateMenuDto);
  }

  async remove(id: number) {
    const menu = await this.findOne(id);
    await menu.destroy();
    return { message: "Menu deleted successfully" };
  }
}

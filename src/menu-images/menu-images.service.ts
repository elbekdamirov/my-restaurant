import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { MenuImage } from "./models/menu-image.model";
import { CreateMenuImageDto } from "./dto/create-menu-image.dto";
import { UpdateMenuImageDto } from "./dto/update-menu-image.dto";

@Injectable()
export class MenuImagesService {
  constructor(
    @InjectModel(MenuImage)
    private readonly menuImageModel: typeof MenuImage
  ) {}

  async create(createMenuImageDto: CreateMenuImageDto) {
    return this.menuImageModel.create(createMenuImageDto);
  }

  async findAll() {
    return this.menuImageModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const image = await this.menuImageModel.findByPk(id, {
      include: { all: true },
    });

    if (!image) {
      throw new NotFoundException(`MenuImage with id ${id} not found`);
    }

    return image;
  }

  async update(id: number, updateMenuImageDto: UpdateMenuImageDto) {
    const image = await this.findOne(id);
    return image.update(updateMenuImageDto);
  }

  async remove(id: number) {
    const image = await this.findOne(id);
    await image.destroy();
    return { message: "MenuImage deleted successfully" };
  }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./models/category.model";

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  async findAll() {
    return this.categoryModel.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    const category = await this.categoryModel.findByPk(id, {
      include: { all: true },
    });

    if (!category) {
      throw new NotFoundException("Category topilmadi");
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    return category.update(updateCategoryDto);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    await category.destroy();
    return { message: "Kategoriya o‘chirildi" };
  }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateRestaurantImageDto } from "./dto/create-restaurant-image.dto";
import { UpdateRestaurantImageDto } from "./dto/update-restaurant-image.dto";
import { RestaurantImage } from "./models/restaurant-image.model";

@Injectable()
export class RestaurantImagesService {
  constructor(
    @InjectModel(RestaurantImage)
    private readonly restaurantImageModel: typeof RestaurantImage
  ) {}

  async create(createDto: CreateRestaurantImageDto) {
    return this.restaurantImageModel.create(createDto);
  }

  async findAll() {
    return this.restaurantImageModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const image = await this.restaurantImageModel.findByPk(id, {
      include: { all: true },
    });

    if (!image) {
      throw new NotFoundException(`RestaurantImage with id ${id} not found`);
    }

    return image;
  }

  async update(id: number, updateDto: UpdateRestaurantImageDto) {
    const image = await this.findOne(id);
    return image.update(updateDto);
  }

  async remove(id: number) {
    const image = await this.findOne(id);
    await image.destroy();
    return { message: "Restaurant image deleted successfully" };
  }
}

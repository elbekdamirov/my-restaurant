import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { Restaurant } from "./models/restaurant.models";

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant)
    private restaurantModel: typeof Restaurant
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantModel.create(createRestaurantDto);
  }

  async findAll() {
    return this.restaurantModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const restaurant = await this.restaurantModel.findByPk(id, {
      include: { all: true },
    });

    if (!restaurant) {
      throw new NotFoundException("Restaurant not found");
    }

    return restaurant;
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    const restaurant = await this.findOne(id);
    return restaurant.update(updateRestaurantDto);
  }

  async remove(id: number) {
    const restaurant = await this.findOne(id);
    await restaurant.destroy();
    return { message: "Restaurant deleted successfully" };
  }
}

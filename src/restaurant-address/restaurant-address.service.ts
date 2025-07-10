import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateRestaurantAddressDto } from "./dto/create-restaurant-address.dto";
import { UpdateRestaurantAddressDto } from "./dto/update-restaurant-address.dto";
import { RestaurantAddress } from "./models/restaurant-address.model";

@Injectable()
export class RestaurantAddressService {
  constructor(
    @InjectModel(RestaurantAddress)
    private addressModel: typeof RestaurantAddress
  ) {}

  async create(createDto: CreateRestaurantAddressDto) {
    return this.addressModel.create(createDto);
  }

  async findAll() {
    return this.addressModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const address = await this.addressModel.findByPk(id, {
      include: { all: true },
    });

    if (!address) {
      throw new NotFoundException("Restaurant address not found");
    }

    return address;
  }

  async update(id: number, updateDto: UpdateRestaurantAddressDto) {
    const address = await this.findOne(id);
    return address.update(updateDto);
  }

  async remove(id: number) {
    const address = await this.findOne(id);
    await address.destroy();
    return { message: "Restaurant address deleted successfully" };
  }
}

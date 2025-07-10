import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Discount } from "./models/discount.model";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import { UpdateDiscountDto } from "./dto/update-discount.dto";
import { Op } from "sequelize";

@Injectable()
export class DiscountsService {
  constructor(
    @InjectModel(Discount)
    private readonly discountModel: typeof Discount
  ) {}

  async create(createDiscountDto: CreateDiscountDto) {
    return this.discountModel.create(createDiscountDto);
  }

  async findAll() {
    return this.discountModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const discount = await this.discountModel.findByPk(id, {
      include: { all: true },
    });
    if (!discount) {
      throw new NotFoundException(`Discount with id ${id} not found`);
    }
    return discount;
  }

  async update(id: number, updateDiscountDto: UpdateDiscountDto) {
    const discount = await this.findOne(id);
    return discount.update(updateDiscountDto);
  }

  async remove(id: number) {
    const discount = await this.findOne(id);
    await discount.destroy();
    return { message: "Discount removed successfully" };
  }

  async findActiveDiscountsByRestaurant(restaurantId: number) {
    const now = new Date();
    return await this.discountModel.findAll({
      where: {
        restaurantId,
        valid_from: { [Op.lte]: now },
        valid_to: { [Op.gte]: now },
      },
    });
  }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { Review } from "./models/review.model";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review)
    private readonly reviewModel: typeof Review
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    return this.reviewModel.create(createReviewDto);
  }

  async findAll() {
    return this.reviewModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const review = await this.reviewModel.findByPk(id, {
      include: { all: true },
    });

    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.findOne(id);
    return review.update(updateReviewDto);
  }

  async remove(id: number) {
    const review = await this.findOne(id);
    await review.destroy();
    return { message: "Review deleted successfully" };
  }
}

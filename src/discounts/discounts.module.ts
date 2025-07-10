import { Module } from "@nestjs/common";
import { DiscountsService } from "./discounts.service";
import { DiscountsController } from "./discounts.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Discount } from "./models/discount.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [SequelizeModule.forFeature([Discount]), AuthModule],
  controllers: [DiscountsController],
  providers: [DiscountsService],
})
export class DiscountsModule {}

import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Category } from "./models/category.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [SequelizeModule.forFeature([Category]), AuthModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}

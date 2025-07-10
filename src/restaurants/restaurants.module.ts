import { Module } from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { RestaurantsController } from "./restaurants.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Restaurant } from "./models/restaurant.models";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [SequelizeModule.forFeature([Restaurant]), AuthModule],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}

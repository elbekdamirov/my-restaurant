import { Module } from "@nestjs/common";
import { RestaurantAddressService } from "./restaurant-address.service";
import { RestaurantAddressController } from "./restaurant-address.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { RestaurantAddress } from "./models/restaurant-address.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [SequelizeModule.forFeature([RestaurantAddress]), AuthModule],
  controllers: [RestaurantAddressController],
  providers: [RestaurantAddressService],
})
export class RestaurantAddressModule {}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { RestaurantAddressService } from "./restaurant-address.service";
import { CreateRestaurantAddressDto } from "./dto/create-restaurant-address.dto";
import { UpdateRestaurantAddressDto } from "./dto/update-restaurant-address.dto";
import { Roles } from "../common/decorators/roles.decorator";
import { UserGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/role.guard";

@Controller("restaurant-address")
export class RestaurantAddressController {
  constructor(
    private readonly restaurantAddressService: RestaurantAddressService
  ) {}

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Post()
  create(@Body() createRestaurantAddressDto: CreateRestaurantAddressDto) {
    return this.restaurantAddressService.create(createRestaurantAddressDto);
  }

  @Get()
  findAll() {
    return this.restaurantAddressService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.restaurantAddressService.findOne(+id);
  }

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRestaurantAddressDto: UpdateRestaurantAddressDto
  ) {
    return this.restaurantAddressService.update(
      +id,
      updateRestaurantAddressDto
    );
  }

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.restaurantAddressService.remove(+id);
  }
}

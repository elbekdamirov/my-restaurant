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
import { RestaurantsService } from "./restaurants.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { UserGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/roles.decorator";

@Controller("restaurants")
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Post()
  create(
    @Body() createRestaurantDto: CreateRestaurantDto
  ): Promise<
    import("d:/Dasturlash/Result/NodeJs/Exam3/src/restaurants/models/restaurant.models").Restaurant
  > {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.restaurantsService.findOne(+id);
  }

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto
  ) {
    return this.restaurantsService.update(+id, updateRestaurantDto);
  }

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.restaurantsService.remove(+id);
  }
}

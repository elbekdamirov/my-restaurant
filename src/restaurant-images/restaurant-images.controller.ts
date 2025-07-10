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
import { RestaurantImagesService } from "./restaurant-images.service";
import { CreateRestaurantImageDto } from "./dto/create-restaurant-image.dto";
import { UpdateRestaurantImageDto } from "./dto/update-restaurant-image.dto";
import { Roles } from "../common/decorators/roles.decorator";
import { UserGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/role.guard";

@Controller("restaurant-images")
export class RestaurantImagesController {
  constructor(
    private readonly restaurantImagesService: RestaurantImagesService
  ) {}

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Post()
  create(@Body() createRestaurantImageDto: CreateRestaurantImageDto) {
    return this.restaurantImagesService.create(createRestaurantImageDto);
  }

  @Get()
  findAll() {
    return this.restaurantImagesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.restaurantImagesService.findOne(+id);
  }

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRestaurantImageDto: UpdateRestaurantImageDto
  ) {
    return this.restaurantImagesService.update(+id, updateRestaurantImageDto);
  }

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.restaurantImagesService.remove(+id);
  }
}

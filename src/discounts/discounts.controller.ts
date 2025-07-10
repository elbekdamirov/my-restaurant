import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { DiscountsService } from "./discounts.service";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import { UpdateDiscountDto } from "./dto/update-discount.dto";
import { Roles } from "../common/decorators/roles.decorator";
import { UserGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/role.guard";

@Controller("discounts")
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Post()
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountsService.create(createDiscountDto);
  }

  @Get()
  findAll() {
    return this.discountsService.findAll();
  }

  @Get("active")
  async getActiveDiscounts(
    @Query("restaurantId", ParseIntPipe) restaurantId: number
  ) {
    const discounts =
      await this.discountsService.findActiveDiscountsByRestaurant(restaurantId);
    return {
      message: `${restaurantId} Restaurant active chegirmalari`,
      data: discounts,
    };
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.discountsService.findOne(+id);
  }

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDiscountDto: UpdateDiscountDto
  ) {
    return this.discountsService.update(+id, updateDiscountDto);
  }

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.discountsService.remove(+id);
  }
}

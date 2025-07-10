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
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Roles } from "../common/decorators/roles.decorator";
import { UserGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/role.guard";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoriesService.remove(+id);
  }
}

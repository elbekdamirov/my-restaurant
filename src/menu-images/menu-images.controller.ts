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
import { MenuImagesService } from "./menu-images.service";
import { CreateMenuImageDto } from "./dto/create-menu-image.dto";
import { UpdateMenuImageDto } from "./dto/update-menu-image.dto";
import { Roles } from "../common/decorators/roles.decorator";
import { UserGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/role.guard";

@Controller("menu-images")
export class MenuImagesController {
  constructor(private readonly menuImagesService: MenuImagesService) {}

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Post()
  create(@Body() createMenuImageDto: CreateMenuImageDto) {
    return this.menuImagesService.create(createMenuImageDto);
  }

  @Get()
  findAll() {
    return this.menuImagesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.menuImagesService.findOne(+id);
  }

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMenuImageDto: UpdateMenuImageDto
  ) {
    return this.menuImagesService.update(+id, updateMenuImageDto);
  }

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.menuImagesService.remove(+id);
  }
}

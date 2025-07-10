import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AddRoleDto } from "./dto/add-role.dto";
import { UserGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { SelfGuard } from "../common/guards/self.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @HttpCode(200)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(SelfGuard)
  @UseGuards(UserGuard)
  @HttpCode(200)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(SelfGuard)
  @UseGuards(UserGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  
  @UseGuards(SelfGuard)
  @UseGuards(UserGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @HttpCode(200)
  @Post("remove_role")
  async removeRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.removeRole(addRoleDto);
  }

  @Get("activate/:activation_link")
  async activateAccount(@Param("activation_link") activation_link: string) {
    return this.usersService.activateUser(activation_link);
  }
}

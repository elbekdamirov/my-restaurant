import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { TablesService } from "./tables.service";
import { CreateTableDto } from "./dto/create-table.dto";
import { UpdateTableDto } from "./dto/update-table.dto";
import { RolesGuard } from "../common/guards/role.guard";
import { UserGuard } from "../common/guards/jwt-auth.guard";
import { Roles } from "../common/decorators/roles.decorator";

@Controller("tables")
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tablesService.create(createTableDto);
  }

  @Get()
  findAll() {
    return this.tablesService.findAll();
  }

  @Get("available")
  async getAvailableTables(@Query("seats", ParseIntPipe) seats: number) {
    if (seats <= 0) {
      return {
        message: "seats must be > 0",
      };
    }

    const availableTables =
      await this.tablesService.findAvailableTablesBySeats(seats);

    return {
      message: `Kamida ${seats} seatsga ega bo'lgan stollar`,
      data: availableTables,
    };
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tablesService.findOne(+id);
  }

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tablesService.update(+id, updateTableDto);
  }

  @Roles("ADMIN", "SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(UserGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tablesService.remove(+id);
  }
}

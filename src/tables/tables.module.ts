import { Module } from "@nestjs/common";
import { TablesService } from "./tables.service";
import { TablesController } from "./tables.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Tables } from "./models/table.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [SequelizeModule.forFeature([Tables]), AuthModule],
  controllers: [TablesController],
  providers: [TablesService],
})
export class TablesModule {}

import { forwardRef, Module } from "@nestjs/common";
import { MenusService } from "./menus.service";
import { MenusController } from "./menus.controller";
import { Menu } from "./models/menu.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [SequelizeModule.forFeature([Menu]), forwardRef(() => AuthModule)],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}

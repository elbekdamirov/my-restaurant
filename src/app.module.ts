import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/model/user.model";
import { AuthModule } from "./auth/auth.module";
import { Role } from "./roles/models/role.model";
import { UserRole } from "./users/model/user-role.model";
import { CategoriesModule } from "./categories/categories.module";
import { Category } from "./categories/models/category.model";
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { Restaurant } from "./restaurants/models/restaurant.models";
import { RestaurantAddressModule } from "./restaurant-address/restaurant-address.module";
import { RestaurantAddress } from "./restaurant-address/models/restaurant-address.model";
import { TablesModule } from "./tables/tables.module";
import { Tables } from "./tables/models/table.model";
import { ReservationsModule } from "./reservations/reservations.module";
import { Reservation } from "./reservations/models/reservation.models";
import { PaymentsModule } from "./payments/payments.module";
import { Payment } from "./payments/models/payment.models";
import { ReviewsModule } from "./reviews/reviews.module";
import { Review } from "./reviews/models/review.model";
import { RestaurantImagesModule } from "./restaurant-images/restaurant-images.module";
import { RestaurantImage } from "./restaurant-images/models/restaurant-image.model";
import { MenusModule } from "./menus/menus.module";
import { Menu } from "./menus/models/menu.model";
import { MenuImagesModule } from "./menu-images/menu-images.module";
import { MenuImage } from "./menu-images/models/menu-image.model";
import { DiscountsModule } from "./discounts/discounts.module";
import { Discount } from "./discounts/models/discount.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),

    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        User,
        Role,
        UserRole,
        Category,
        Restaurant,
        RestaurantAddress,
        Tables,
        Reservation,
        Payment,
        Review,
        RestaurantImage,
        Menu,
        MenuImage,
        Discount,
      ],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true },
    }),

    UsersModule,

    AuthModule,

    CategoriesModule,

    RestaurantsModule,

    RestaurantAddressModule,

    TablesModule,

    ReservationsModule,

    PaymentsModule,

    ReviewsModule,

    RestaurantImagesModule,

    MenusModule,

    MenuImagesModule,

    DiscountsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

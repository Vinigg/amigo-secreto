import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersModule } from "./users/users.module"
import { ItemsModule } from "./items/items.module"

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERMAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      logging: false,
      migrations: [__dirname + "/migrations/*{.ts,.js}"],
      migrationsRun: true,
      entities: [__dirname + "/**/*.entity{.ts,.js}"]
    }),
    UsersModule,
    ItemsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

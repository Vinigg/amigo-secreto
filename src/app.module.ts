// app.module.ts
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppDataSource } from "./data-source" // Import the data source
import { GroupsModule } from "./groups/groups.module"
import { ItemsModule } from "./items/items.module"
import { UsersModule } from "./users/users.module"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(AppDataSource.options),
    UsersModule,
    ItemsModule,
    GroupsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

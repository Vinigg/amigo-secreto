import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Items } from "src/items/items.entity"
import { UsersItems } from "src/usersItems/userItems.entity"
import { Users } from "./user.entity"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"

@Module({
  imports: [TypeOrmModule.forFeature([Users, Items, UsersItems])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}

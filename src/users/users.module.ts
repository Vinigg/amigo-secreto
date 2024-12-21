import { Module } from "@nestjs/common"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Users } from "./user.entity"
import { Items } from "src/items/items.entity"
import { UsersItems } from "src/usersItems/userItems.entity"

@Module({
  //need to import UserItemsRepository
  imports: [TypeOrmModule.forFeature([Users, Items, UsersItems])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}

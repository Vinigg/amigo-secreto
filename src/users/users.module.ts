import { Module } from "@nestjs/common"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Users } from "./user.entity"
import { UserItems } from "src/usersItems/userItems.entity"

@Module({
  //need to import UserItemsRepository
  imports: [TypeOrmModule.forFeature([Users]), TypeOrmModule.forFeature([UserItems])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}

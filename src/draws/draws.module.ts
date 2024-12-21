import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Draws } from "./draws.entity"
import { DrawsService } from "./draws.service"
import { DrawsController } from "./draws.controller"
import { Users } from "../users/user.entity"
import { Groups } from "../groups/groups.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Draws, Users, Groups])],
  providers: [DrawsService],
  controllers: [DrawsController]
})
export class DrawsModule {}

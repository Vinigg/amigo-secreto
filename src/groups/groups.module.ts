import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { GroupsController } from "./groups.controller"
import { GroupsService } from "./groups.service"
import { Groups } from "./groups.entity"
import { Users } from "../users/user.entity"
import { GroupMembers } from "../groupMembers/groupMembers.entity"

@Module({
  imports: [
    TypeOrmModule.forFeature([Groups, Users, GroupMembers]) // Registra as entidades necessárias
  ],
  controllers: [GroupsController],
  providers: [GroupsService], // Declara o serviço como provider
  exports: [GroupsService] // Exporta o serviço, caso necessário em outros módulos
})
export class GroupsModule {}

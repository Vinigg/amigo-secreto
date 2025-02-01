import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Users } from "../users/user.entity"
import { GroupsController } from "./groups.controller"
import { Groups } from "./groups.entity"
import { GroupsService } from "./groups.service"

@Module({
  imports: [
    TypeOrmModule.forFeature([Groups, Users]) // Registra as entidades necessárias
  ],
  controllers: [GroupsController],
  providers: [GroupsService], // Declara o serviço como provider
  exports: [GroupsService] // Exporta o serviço, caso necessário em outros módulos
})
export class GroupsModule {}

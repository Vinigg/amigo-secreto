import { Controller, Post, Get, Param, Body } from "@nestjs/common"
import { DrawsService } from "./draws.service"

@Controller("draws")
export class DrawsController {
  constructor(private readonly drawsService: DrawsService) {}

  // Criar um sorteio
  @Post()
  async createDraw(
    @Body("groupId") groupId: string,
    @Body("giverId") giverId: string,
    @Body("receiverId") receiverId: string
  ) {
    return this.drawsService.createDraw(groupId, giverId, receiverId)
  }

  // Buscar sorteios por grupo
  @Get("group/:groupId")
  async getDrawsByGroup(@Param("groupId") groupId: string) {
    return this.drawsService.getDrawsByGroup(groupId)
  }
}

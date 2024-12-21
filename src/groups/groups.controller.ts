import { Controller, Post, Body, Get, Res } from "@nestjs/common"
import { GroupsService } from "./groups.service"
import { Response } from "express"
@Controller("groups")
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  async myGroups(@Body("userId") userId: string) {
    return this.groupsService.myGroups(userId)
  }
  @Post()
  async createGroup(@Res() response: Response, @Body() groupsDTO) {
    const groupCreated = await this.groupsService.createGroup(groupsDTO)
    return response.status(201).json(groupCreated)
  }
  @Post("add-member")
  async addUserToGroup(@Body("userId") userId: string, @Body("groupId") groupId: string) {
    return this.groupsService.addUserToGroup(userId, groupId)
  }
}

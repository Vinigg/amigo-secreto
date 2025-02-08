import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common"
import { Response } from "express"
import { addUserOnGroupDto } from "./dto/add-user-on-group.dto"
import { GroupsDto } from "./dto/groups.dto"
import { GroupsService } from "./groups.service"

@Controller("groups")
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  async findAllGroups(@Res() response: Response) {
    const users = await this.groupsService.findAllGroups()
    return response.status(200).json(users)
  }

  @Get(":id")
  async findGroupById(@Res() response: Response, @Param("id") id: string) {
    const group = await this.groupsService.findGroupById(id)
    return response.status(200).json(group)
  }

  @Post()
  async createGroup(@Res() response: Response, @Body() group: GroupsDto) {
    const groupCreated = await this.groupsService.createGroup(group)
    return response.status(201).json(groupCreated)
  }

  @Post("add-user")
  async addUserToGroup(@Res() response: Response, @Body() options: addUserOnGroupDto) {
    const group = await this.groupsService.addUserToGroup(options.groupId, options.email)
    return response.status(201).json(group)
  }

  @Get(":id/users")
  async getGroupUsers(@Res() response: Response, @Param("id") id: string) {
    const users = await this.groupsService.getGroupUsers(id)
    return response.status(200).json(users)
  }
}

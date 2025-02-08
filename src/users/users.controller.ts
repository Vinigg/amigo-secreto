import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common"
import { Response } from "express"
import { AddItemOnUserDTO } from "./dto/add-item-on-user.dto"
import { UsersDto } from "./dto/users.dto"
import { UsersService } from "./users.service"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUsers(@Res() response: Response) {
    const users = await this.usersService.findAllUsers()
    return response.status(200).json(users)
  }

  @Post()
  async createUser(@Res() response: Response, @Body() userDTO: UsersDto) {
    const userCreated = await this.usersService.createUser(userDTO)
    return response.status(201).json(userCreated)
  }

  @Post("assign-item")
  async assignItem(@Body() input: AddItemOnUserDTO) {
    return this.usersService.assignItemToUser(input.userId, input.itemId)
  }

  @Get("/items/:userId")
  async getUserItems(@Param("userId") userId: string) {
    return this.usersService.getUserItems(userId)
  }
}

import { Body, Controller, Get, Post, Res } from "@nestjs/common"
import { Response } from "express"
import { ItemsService } from "./items.service"
import { ItemsDto } from "./dto/items.dto/items.dto"

@Controller("items")
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAllItems(@Res() response: Response) {
    const items = await this.itemsService.findAllItems()
    return response.status(200).json(items)
  }

  @Post()
  async createItem(@Res() response: Response, @Body() item: ItemsDto) {
    const createdItem = await this.itemsService.createItem(item)
    return response.status(201).json(createdItem)
  }
}

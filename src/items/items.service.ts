import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Items } from "./items.entity"
import { ItemsDto } from "./dto/items.dto/items.dto"

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items)
    private readonly itemsRepository: Repository<Items>
  ) {}

  async findAllItems(): Promise<Items[]> {
    const items = await this.itemsRepository.find()
    return items
  }

  async createItem(item: ItemsDto): Promise<ItemsDto> {
    const createdItem = await this.itemsRepository.save(item)
    return createdItem
  }
}

import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { ItemsDto } from "./dto/items.dto"
import { Items } from "./items.entity"

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

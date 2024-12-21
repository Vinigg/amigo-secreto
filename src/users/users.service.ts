import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Users } from "./user.entity"
import { UsersDto } from "./dto/users.dto.ts/users.dto"
import { UsersItems } from "src/usersItems/userItems.entity"
import { Items } from "src/items/items.entity"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Items) private itemsRepository: Repository<Items>,
    @InjectRepository(UsersItems) private usersItemsRepository: Repository<UsersItems>
  ) {}

  async findAllUsers(): Promise<Users[]> {
    const users = await this.usersRepository.find()
    return users
  }

  async createUser(userDTO: UsersDto): Promise<UsersDto> {
    const createdUser = await this.usersRepository.save(userDTO)
    return createdUser
  }

  async assignItemToUser(userId: string, itemId: string): Promise<UsersItems> {
    const user = await this.usersRepository.findOne({ where: { id: userId } })
    const item = await this.itemsRepository.findOne({ where: { id: itemId } })

    if (!user) {
      throw new Error("User not found")
    }

    if (!item) {
      throw new Error("Item not found")
    }

    const userItem = this.usersItemsRepository.create({
      user,
      item
    })

    return this.usersItemsRepository.save(userItem)
  }

  async getUserItems(userId: string): Promise<Items[]> {
    const userItems = await this.usersItemsRepository.find({
      where: { user: { id: userId } },
      relations: ["item"]
    })

    if (!userItems || userItems.length === 0) {
      throw new Error("No items found for this user.")
    }

    // Extrai os itens da relação users_items
    return userItems.map((userItem) => userItem.item)
  }
}

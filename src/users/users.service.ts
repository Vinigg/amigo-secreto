import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Users } from "./user.entity"
import { UserItems } from "../usersItems/userItems.entity"
import { UsersDto } from "./dto/users.dto.ts/users.dto"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,

    @InjectRepository(UserItems)
    private readonly userItemsRepository: Repository<UserItems>
  ) {}

  async findAllUsers(): Promise<Users[]> {
    const users = await this.usersRepository.find()
    return users
  }

  async createUser(userDTO: UsersDto): Promise<UsersDto> {
    const createdUser = await this.usersRepository.save(userDTO)
    return createdUser
  }

  async addItemToUser(userId: string, itemId: string): Promise<Users> {
    //ERROR [ExceptionsHandler] o valor nulo na coluna "name" da relação "users" viola a restrição de não-nulo
    const user = await this.usersRepository.findOne({ where: { id: userId } })

    console.log(user)
    await this.userItemsRepository.save({ userId, itemId })

    return user
  }
}

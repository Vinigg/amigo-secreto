import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Users } from "./user.entity"
import { UsersDto } from "./dto/users.dto.ts/users.dto"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) {}

  async findAllUsers(): Promise<Users[]> {
    const users = await this.usersRepository.find()
    return users
  }

  async createUser(userDTO: UsersDto): Promise<UsersDto> {
    const createdUser = await this.usersRepository.save(userDTO)
    return createdUser
  }
}

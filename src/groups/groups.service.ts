import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Groups } from "../groups/groups.entity"
import { Users } from "../users/user.entity"

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Groups) private groupsRepository: Repository<Groups>
  ) {}
}

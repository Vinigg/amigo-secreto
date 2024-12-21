import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Users } from "../users/user.entity"
import { Groups } from "../groups/groups.entity"
import { GroupMembers } from "../groupMembers/groupMembers.entity"
import { GroupsDto } from "./dto/groups.dto"

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Groups) private groupsRepository: Repository<Groups>,
    @InjectRepository(GroupMembers) private groupMembersRepository: Repository<GroupMembers>
  ) {}
  async myGroups(userId: string): Promise<Groups[]> {
    const userGroups = await this.groupMembersRepository.find({
      where: { user: { id: userId } },
      relations: ["group"]
    })

    // Retorna os grupos da relação
    return userGroups.map((groupMember) => groupMember.group)
  }
  async createGroup(groupsDTO: GroupsDto): Promise<Groups> {
    const group = this.groupsRepository.save(groupsDTO)
    return group
  }
  async addUserToGroup(userId: string, groupId: string): Promise<GroupMembers> {
    const user = await this.usersRepository.findOne({ where: { id: userId } })
    const group = await this.groupsRepository.findOne({ where: { id: groupId } })

    if (!user) {
      throw new Error("User not found")
    }

    if (!group) {
      throw new Error("Group not found")
    }

    const groupMember = this.groupMembersRepository.create({
      user,
      group
    })

    return this.groupMembersRepository.save(groupMember)
  }
}

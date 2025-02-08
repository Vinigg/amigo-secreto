import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Groups } from "../groups/groups.entity"
import { Users } from "../users/user.entity"
import { GroupsDto } from "./dto/groups.dto"

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Groups) private groupsRepository: Repository<Groups>
  ) {}

  async findAllGroups(): Promise<Groups[]> {
    const groups = await this.groupsRepository.find()
    return groups
  }

  async findGroupById(id: string): Promise<Groups> {
    const group = await this.groupsRepository.findOne({ where: { id }, relations: ["users"] })
    return group
  }

  async createGroup(group: GroupsDto): Promise<Groups> {
    const createdGroup = await this.groupsRepository.save(group)
    return createdGroup
  }

  async addUserToGroup(groupId: string, userEmail: string): Promise<{ message: string }> {
    // Find the group by ID
    const group = await this.groupsRepository.findOne({
      where: { id: groupId },
      relations: ["users"] // Load the related users
    })

    if (!group) {
      throw new Error("Group not found")
    }

    // Find the user by email
    const user = await this.usersRepository.findOne({
      where: { email: userEmail }
    })

    if (!user) {
      throw new Error("User not found")
    }

    // Initialize the users array if it doesn't exist
    group.users = group.users || []

    // Check if the user is already in the group
    const userExistsInGroup = group.users.some((u) => u.id === user.id)
    if (userExistsInGroup) {
      return { message: "User already in group" }
    }

    // Add the user to the group's users array
    group.users.push(user)

    await this.groupsRepository.save(group)
    // Save the updated group
    return { message: " User added to group" }
  }

  async getGroupUsers(groupId: string): Promise<Users[]> {
    const group = await this.groupsRepository.findOne({ where: { id: groupId }, relations: ["users"] })
    return group.users
  }
}

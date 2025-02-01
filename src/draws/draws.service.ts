import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Groups } from "src/groups/groups.entity"
import { Users } from "src/users/user.entity"
import { Repository } from "typeorm"
import { Draws } from "./draws.entity"

@Injectable()
export class DrawsService {
  constructor(
    @InjectRepository(Groups)
    private readonly groupsRepository: Repository<Groups>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Draws)
    private readonly drawRepository: Repository<Draws>
  ) {}

  async performDraw(groupId: string): Promise<void> {
    // Find the group and its users
    const group = await this.groupsRepository.findOne({
      where: { id: groupId },
      relations: ["users"]
    })

    if (!group) {
      throw new Error("Group not found")
    }

    const users = group.users

    if (users.length < 2) {
      throw new Error("Not enough users to perform a draw")
    }

    // Shuffle users
    const shuffledUsers = [...users].sort(() => Math.random() - 0.5)

    // Create draws and save them to the database
    for (let i = 0; i < shuffledUsers.length; i++) {
      const giver = shuffledUsers[i]
      const receiver = shuffledUsers[(i + 1) % shuffledUsers.length]

      const draw = this.drawRepository.create({
        group,
        giver,
        receiver
      })

      await this.drawRepository.save(draw)
    }
  }
}

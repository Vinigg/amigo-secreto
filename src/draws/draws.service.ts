import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Draws } from "./draws.entity"
import { Users } from "../users/user.entity"
import { Groups } from "../groups/groups.entity"

@Injectable()
export class DrawsService {
  constructor(
    @InjectRepository(Draws) private drawRepository: Repository<Draws>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Groups) private groupRepository: Repository<Groups>
  ) {}

  // Criar um sorteio
  async createDraw(groupId: string, giverId: string, receiverId: string): Promise<Draws> {
    const group = await this.groupRepository.findOne({ where: { id: groupId } })
    const giver = await this.userRepository.findOne({ where: { id: giverId } })
    const receiver = await this.userRepository.findOne({ where: { id: receiverId } })

    if (!group) throw new Error("Group not found")
    if (!giver) throw new Error("Giver not found")
    if (!receiver) throw new Error("Receiver not found")

    const draw = this.drawRepository.create({ group, giver, receiver })
    return this.drawRepository.save(draw)
  }

  // Buscar sorteios por grupo
  async getDrawsByGroup(groupId: string): Promise<Draws[]> {
    return this.drawRepository.find({
      where: { group: { id: groupId } },
      relations: ["giver", "receiver", "group"]
    })
  }
}

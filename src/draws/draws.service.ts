import drawResultTemplate from "@/utils/emailsTemplates/drawResult"
import { sendEmail } from "@/utils/sendEmail"
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
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
    // Fetch the group and its users
    const group = await this.groupsRepository.findOne({
      where: { id: groupId },
      relations: ["users"] // Load the users associated with the group
    })

    if (!group) {
      throw new HttpException("Group not found", HttpStatus.NOT_FOUND)
    }

    const users = group.users

    // Ensure there are enough users to perform a draw
    if (users.length < 2) {
      throw new HttpException("Not enough users to perform a draw", HttpStatus.BAD_REQUEST)
    }

    // Shuffle the users array
    const shuffledUsers = this.shuffleArray([...users])

    // Create draws and save them to the database
    for (let i = 0; i < shuffledUsers.length; i++) {
      const giver = shuffledUsers[i]
      const receiver = shuffledUsers[(i + 1) % shuffledUsers.length] // Assign the next user in the list

      // Create a new Draw entity
      const draw = this.drawRepository.create({
        group,
        giver,
        receiver
      })

      // Send an email to the giver with the draw result
      console.log(`Sending email to ${giver.email}`)
      await sendEmail(
        giver.email,
        "Amigo Secreto - Resultado do sorteio",
        drawResultTemplate(receiver.name, giver.name)
      )

      // Save the draw to the database
      await this.drawRepository.save(draw)
    }
  }

  // Helper function to shuffle an array
  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
}

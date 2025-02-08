import { AppDataSource } from "@/data-source"
import { Draws } from "@/draws/draws.entity" // Adjust the path to your entity
import { DrawsService } from "@/draws/draws.service" // Adjust the path to your service
import { Groups } from "@/groups/groups.entity"
import { Users } from "@/users/user.entity" // Adjust the path to your entity

export const processMakeGroupsDraw = async (): Promise<void> => {
  console.log("🏃 Running processMakeGroupsDraw")

  // Initialize the repositories
  const groupsRepository = AppDataSource.getRepository(Groups)
  const usersRepository = AppDataSource.getRepository(Users)
  const drawsRepository = AppDataSource.getRepository(Draws)

  // Manually instantiate the DrawsService
  const drawsService = new DrawsService(groupsRepository, usersRepository, drawsRepository)

  // Get all groups with their users
  const groups = await groupsRepository.find({ relations: ["users"] })

  // Iterate over each group and if the column draw_day is today, make the draw
  for (const group of groups) {
    // Check if the draw_day is today
    const today = new Date()
    const drawDay = new Date(group.drawDay)
    if (
      today.getFullYear() === drawDay.getFullYear() &&
      today.getMonth() === drawDay.getMonth() &&
      today.getDate() === drawDay.getDate()
    ) {
      // Check if the draws table already has draws for this group
      const drawsWasMade = await drawsRepository.findOne({ where: { group: { id: group.id } }, relations: ["group"] })
      if (drawsWasMade) {
        console.log(`🎁 Draw already made for group ${group.id}`)
        continue
      }
      console.log(`🎉 Making draw for group ${group.id}`)

      // Make the draw using the DrawsService
      await drawsService.performDraw(group.id)
    }
  }
}

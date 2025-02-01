import { Controller, HttpException, HttpStatus, Param, Post } from "@nestjs/common"
import { DrawsService } from "./draws.service"

@Controller("draws")
export class DrawsController {
  constructor(private readonly drawService: DrawsService) {}

  @Post(":groupId") // Endpoint to trigger the draw for a specific group
  async performDraw(@Param("groupId") groupId: string): Promise<string> {
    try {
      // Call the DrawService to perform the draw
      await this.drawService.performDraw(groupId)
      return `Draw completed successfully for group ${groupId}!`
    } catch (error) {
      // Handle errors and return appropriate HTTP responses
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message || "Failed to perform the draw"
        },
        HttpStatus.BAD_REQUEST
      )
    }
  }
}

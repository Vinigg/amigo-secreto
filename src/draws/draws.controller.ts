import { Controller, HttpException, HttpStatus, Param, Post } from "@nestjs/common"
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger"
import { DrawsService } from "./draws.service"

@ApiTags("Draw")
@Controller("draws")
export class DrawsController {
  constructor(private readonly drawService: DrawsService) {}

  @Post(":groupId") // Endpoint to trigger the draw for a specific group
  @ApiOperation({ summary: "Perform a draw for a group" })
  @ApiParam({ name: "groupId", description: "ID of the group to perform the draw for" }) // Describe the parameter
  @ApiResponse({ status: 200, description: "Draw completed successfully" }) // Describe the response
  @ApiResponse({ status: 400, description: "Failed to perform the draw" }) // Describe the error response
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

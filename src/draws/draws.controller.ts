import { Controller } from "@nestjs/common"
import { DrawsService } from "./draws.service"

@Controller("draws")
export class DrawsController {
  constructor(private readonly drawsService: DrawsService) {}
}

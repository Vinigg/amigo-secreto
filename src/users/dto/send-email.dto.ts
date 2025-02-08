import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class SendEmailDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: string
}

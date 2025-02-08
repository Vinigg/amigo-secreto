import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class addUserOnGroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "The ID of the group", example: "1" })
  groupId: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: "The email of the user", example: "example@email.com" })
  email: string
}

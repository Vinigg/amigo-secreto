import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class GroupsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string
}

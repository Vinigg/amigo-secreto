import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class AddItemOnUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly itemId: string
}

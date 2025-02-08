import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUrl } from "class-validator"

export class ItemsDto {
  @ApiProperty({ nullable: true })
  readonly id?: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty()
  readonly url: string
}

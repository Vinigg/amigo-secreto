import { IsNotEmpty, IsString } from "class-validator"

export class GroupsDto {
  @IsString()
  @IsNotEmpty()
  readonly id?: string

  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly description: string
}

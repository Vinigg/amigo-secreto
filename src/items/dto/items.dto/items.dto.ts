import { IsNotEmpty, IsString, IsUrl } from "class-validator"

export class ItemsDto {
  @IsString()
  @IsNotEmpty()
  readonly id?: string

  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  readonly url: string
}

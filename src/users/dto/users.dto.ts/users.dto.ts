import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class UsersDto {
  @IsString()
  @IsNotEmpty()
  readonly id?: string

  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  readonly password: string
}

export class UsersDto {
  readonly id?: number
  readonly name: string
  readonly email: string
  readonly password: string
  readonly createdAt: Date
  readonly updatedAt?: Date
  readonly deletedAt?: Date
}

import { ApiProperty } from "@nestjs/swagger"
import { Groups } from "src/groups/groups.entity"
import { UsersItems } from "src/usersItems/userItems.entity"
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"

@Entity({ name: "users" })
export class Users {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ description: "The ID of the user", example: 1 })
  id: string

  @Column({ name: "name", nullable: false })
  @ApiProperty({ description: "The name of the user", example: "Alice" })
  name: string

  @Column({ name: "email", nullable: false, unique: true })
  @ApiProperty({ description: "The email of the user", example: "alice@example.com" })
  email: string

  @Column({ name: "password", nullable: false })
  password: string

  @OneToMany(() => UsersItems, (usersItems) => usersItems.user)
  usersItems: UsersItems[]

  @ManyToMany(() => Groups, (group) => group.users)
  @JoinTable({ name: "user_groups", joinColumn: { name: "user_id" }, inverseJoinColumn: { name: "group_id" } })
  group: Groups[]

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt: Date
}

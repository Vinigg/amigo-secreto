import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import { Items } from "../items/items.entity"
import { UsersItems } from "src/usersItems/userItems.entity"
import { GroupMembers } from "src/groupMembers/groupMembers.entity"

@Entity({ name: "users" })
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ name: "name", nullable: false })
  name: string

  @Column({ name: "email", nullable: false, unique: true })
  email: string

  @Column({ name: "password", nullable: false })
  password: string

  @OneToMany(() => UsersItems, (usersItems) => usersItems.user)
  usersItems: UsersItems[]

  @OneToMany(() => GroupMembers, (groupMembers) => groupMembers.user)
  groupMembers: GroupMembers[]

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt: Date
}

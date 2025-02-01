import { Groups } from "src/groups/groups.entity"
import { UsersItems } from "src/usersItems/userItems.entity"
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"

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

  @ManyToOne(() => Groups, (group) => group.users)
  group: Groups

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt: Date
}

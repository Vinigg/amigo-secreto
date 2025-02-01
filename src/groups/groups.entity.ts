import { Draws } from "src/draws/draws.entity"
import { Users } from "src/users/user.entity"
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"

@Entity("groups")
export class Groups {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ name: "name", nullable: false })
  name: string

  @Column({ name: "description", nullable: true })
  description: string

  @OneToMany(() => Users, (users) => users.group)
  users: Users[]

  @OneToMany(() => Draws, (draw) => draw.group)
  draws: Draws[]

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt: Date
}

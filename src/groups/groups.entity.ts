import { GroupMembers } from "src/groupMembers/groupMembers.entity"
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany
} from "typeorm"

@Entity("groups")
export class Groups {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ name: "name", nullable: false })
  name: string

  @Column({ name: "description", nullable: true })
  description: string

  @OneToMany(() => GroupMembers, (groupMembers) => groupMembers.group)
  groupMembers: GroupMembers[]

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt: Date
}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Groups } from "../groups/groups.entity"
import { Users } from "../users/user.entity"

@Entity("draws")
export class Draws {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Groups, (group) => group.draws)
  group: Groups

  @ManyToOne(() => Users)
  giver: Users

  @ManyToOne(() => Users)
  receiver: Users

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date

  @Column({ type: "timestamp", nullable: true })
  deleted_at: Date
}

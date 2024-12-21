import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Groups } from "../groups/groups.entity"
import { Users } from "../users/user.entity"

@Entity("draws")
export class Draws {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Groups, (group) => group.draws, { onDelete: "CASCADE" })
  @JoinColumn({ name: "group_id" })
  group: Groups

  @ManyToOne(() => Users, { onDelete: "CASCADE" })
  @JoinColumn({ name: "giver_id" })
  giver: Users

  @ManyToOne(() => Users, { onDelete: "CASCADE" })
  @JoinColumn({ name: "receiver_id" })
  receiver: Users
}

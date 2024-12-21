import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Users } from "../users/user.entity"
import { Groups } from "../groups/groups.entity"

@Entity("group_members")
export class GroupMembers {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => Users, (user) => user.groupMembers)
  @JoinColumn({ name: "user_id" }) // Mapeia para a coluna userId no banco
  user: Users

  @ManyToOne(() => Groups, (group) => group.groupMembers)
  @JoinColumn({ name: "group_id" }) // Mapeia para a coluna groupId no banco
  group: Groups
}

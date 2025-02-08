import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Groups } from "../groups/groups.entity"
import { Users } from "../users/user.entity"

@Entity("draws")
export class Draws {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "The ID of the draw", example: 1 })
  id: number

  @ManyToOne(() => Groups, (group) => group.draws)
  @ApiProperty({ description: "The group of the draw", example: "1" })
  @JoinColumn({ name: "group_id" })
  group: Groups

  @ManyToOne(() => Users)
  @ApiProperty({ description: "The user that will give the gift", example: "1" })
  @JoinColumn({ name: "giver_id" })
  giver: Users

  @ManyToOne(() => Users)
  @ApiProperty({ description: "The user that will receive the gift", example: "1" })
  @JoinColumn({ name: "receiver_id" })
  receiver: Users

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date

  @Column({ type: "timestamp", nullable: true })
  deleted_at: Date
}

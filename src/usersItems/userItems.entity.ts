import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
@Entity()
export class UserItems {
  @PrimaryGeneratedColumn("uuid")
  id: number

  @Column({ name: "user_id", nullable: false })
  userId: string

  @Column({ name: "item_id", nullable: false })
  itemId: string

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt: Date
}

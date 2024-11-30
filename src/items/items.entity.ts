import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: "items" })
export class Items {
  @PrimaryGeneratedColumn("uuid")
  id: number

  @Column({ name: "name", nullable: false })
  name: string

  @Column({ name: "url", nullable: false })
  url: string

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt: Date
}

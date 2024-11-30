import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import { Items } from "../items/items.entity"

@Entity({ name: "users" })
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: number

  @Column({ name: "name", nullable: false })
  name: string

  @Column({ name: "email", nullable: false, unique: true })
  email: string

  @Column({ name: "password", nullable: false })
  password: string

  @ManyToMany(() => Items)
  @JoinTable({ name: "user_items", joinColumn: { name: "user_id" }, inverseJoinColumn: { name: "item_id" } })
  items: Items[]

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt: Date
}

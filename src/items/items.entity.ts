import { UsersItems } from "src/usersItems/userItems.entity"
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"

@Entity({ name: "items" })
export class Items {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ name: "name", nullable: false })
  name: string

  @Column({ name: "url", nullable: false })
  url: string

  @OneToMany(() => UsersItems, (usersItems) => usersItems.item)
  usersItems: UsersItems[]

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt: Date
}

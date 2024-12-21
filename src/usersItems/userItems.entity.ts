import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm"
import { Users } from "../users/user.entity"
import { Items } from "../items/items.entity"

@Entity("user_items")
export class UsersItems {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => Users, (user) => user.usersItems)
  @JoinColumn({ name: "user_id" })
  user: Users

  @ManyToOne(() => Items, (item) => item.usersItems)
  @JoinColumn({ name: "item_id" })
  item: Items
}

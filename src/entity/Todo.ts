import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import { MaxLength, MinLength, IsDefined } from "class-validator"

@Entity("todos")
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsDefined({ message: "Title is required." })
  @MinLength(2, { message: "Title must be at least 2 characters" })
  @MaxLength(20, { message: "Title must be less than 20 characters" })
  title: string

  @Column()
  isDone: boolean = false

  @Column()
  @IsDefined({ message: "UserId is required." })
  userId: number

  constructor(title: string, userId: number) {
    super()
    this.title = title
    this.userId = userId
  }
}

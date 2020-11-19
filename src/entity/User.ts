import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import { IsEmail, MaxLength, MinLength, IsDefined } from "class-validator"

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsDefined({ message: "Name is required." })
  @MinLength(2, { message: "Name must be at least 2 characters" })
  @MaxLength(20, { message: "Name must be less than 20 characters" })
  name: string

  @Column()
  @IsDefined({ message: "Email is required." })
  @IsEmail({}, { message: "Invalid email format." })
  email: string

  @Column()
  @IsDefined({ message: "Password is required." })
  @MinLength(4, { message: "Password must be at least 4 characters." })
  password: string

  constructor(name: string, email: string, pass: string) {
    super()
    this.name = name
    this.email = email
    this.password = pass
  }
}

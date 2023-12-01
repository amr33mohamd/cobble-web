import { Entity, PrimaryGeneratedColumn, Column , CreateDateColumn, UpdateDateColumn} from 'typeorm';
import * as bcrypt from "bcrypt";
export enum UserRoleType {
    Admin = "admin",
    User = "user",
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false})
  firstName: string;

  @Column({nullable:false})
  lastName: string;

  @Column({unique:true,nullable:false})
  email: string;

  @Column({nullable:false})
  password: string;

    @Column({
        type: "enum",
        enum: UserRoleType,
        default: "user",
    })
    role: UserRoleType;

  @Column({default:true})
    active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
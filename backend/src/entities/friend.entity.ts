import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Friend {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.friends)
    user: User;

    @Column()
    friendLogin: string;
}

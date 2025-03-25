import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { Friend } from "./friend.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    githubId: number;

    @Column({ unique: true })
    login: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    avatar: string

    @Column({ nullable: true })
    location: string;

    @Column({ nullable: true })
    blog: string;

    @Column({ nullable: true })
    bio: string;

    @Column()
    publicRepos: number;

    @Column()
    publicGists: number;

    @Column()
    followers: number;

    @Column()
    following: number;

    @Column({ default: false })
    isDeleted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Friend, (friend) => friend.user)
    friends: Friend[];
}
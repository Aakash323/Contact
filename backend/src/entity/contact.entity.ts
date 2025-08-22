import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Contact {

    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    username!:string;

    @Column({type:'text',nullable:true})
    user_photo:string | undefined;

    @Column({unique:true})
    user_email!:string;

    @Column()
    user_phone!:string;

    @Column()
    property_type!: string;

    @Column()
    properties!: string;

    @Column({ nullable: true })
    company!: string;

    @CreateDateColumn()
    created_at!: Date;

    @ManyToOne(() => User, (user) => user.contacts)
    user!: User;
}
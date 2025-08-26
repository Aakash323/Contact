import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Contact } from "./contact.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!:string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Contact, (contact) => contact.user,{
    cascade:true,
    onDelete:"CASCADE"
  })
  contacts!: Contact[];
}

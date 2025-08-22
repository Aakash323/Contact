import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import { Contact } from "./entity/contact.entity";
import { User } from "./entity/user.entity";

dotenv.config();

export const AppDataSource= new DataSource({
  type:"postgres",
  host:process.env.DB_HOST!,
  port:Number(process.env.DB_PORT!),
  username:process.env.DB_USERNAME!,
  password:process.env.DB_PASSWORD!,
  database:process.env.DB_NAME!,
  synchronize:true,
  logging:false,
  entities:[User,Contact]
})
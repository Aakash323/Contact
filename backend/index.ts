import "reflect-metadata";
import express, { Request,Response } from "express";
import dotenv from 'dotenv';
import { AppDataSource } from "./src/data-source";
import { contactRouter } from "./src/routes/contactRoute";
import { userRouter } from "./src/routes/userRoute";


dotenv.config();
const app = express();
const PORT = process.env.PORT;


app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello" });
});

app.use('/api/contact',contactRouter)
app.use('/api/user',userRouter)


app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
}) 

AppDataSource.initialize()
.then(()=>{
    console.log("Data source initialized sucessfully")})
.catch((err)=>{
    console.error("error in data source initialization");
    console.log(err);
    
})

    

  

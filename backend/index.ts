import "reflect-metadata";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./src/data-source";
import { contactRouter } from "./src/routes/contactRoute";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { userRouter } from "./src/routes/userRoute";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello" });
});

app.use("/api/contact", contactRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data source initialized sucessfully");
  })
  .catch((error: Error) => {
    console.error("error in data source initialization");
    console.log(error);
  });

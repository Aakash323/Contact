import { AppDataSource } from "../data-source";
import { User } from "../entity/user.entity";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.json({ message: "All fields are required" });
    }

    const existingUser = await AppDataSource.manager.findOne(User, {
      where: { email },
    });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = hashedPassword;

    await AppDataSource.manager.save(newUser);

    return res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ message: "Registration failed" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await AppDataSource.manager.findOne(User, {
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
      message:"Login sucessfull"
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Cannot login" });
  }
};

import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken";


export interface AuthRequest extends Request {
  userId?: number;
  file?:Express.Multer.File | undefined;
}

interface payload{
    id:string;
}

export const verifyUser = (req:AuthRequest ,res:Response,next:NextFunction)=>{
        const header = req.headers.authorization;
    if(!header) return res.json({message:"Unauthorized.. Please login."})

        const token = header.split(' ')[1];
        if(!token) return res.json({message:"Unauthorized.. Please login."})

            try {
                const decodedInfo =jwt.verify(token,process.env.JWT_SECRET!) as payload;
                req.userId = parseInt(decodedInfo.id);
                next();
            } catch (error) {
                console.error(error);
                return res.json({message:"Cannot verify user."})
                
            }
}
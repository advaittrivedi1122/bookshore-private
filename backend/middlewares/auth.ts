import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Users from "../database/models/Users";

const authMiddleware = async (req:Request|any, res:Response, next:NextFunction) => {
    if (!req.headers.authorization) {
        const existingUser = await Users.findOne({
            username : req.body.username
        })
        if (existingUser) {
            return res.status(411).json({
                message : "User is already registered!"
            })
        }
    
        const user = await Users.create({
            username : req.body.username,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password : req.body.password
        })
    
        const userId = user._id
    
        const token = jwt.sign({
            userId
        }, process.env.JWT_SECRET as string)
    
        return res.json({
            message : "User created successfully",
            token : token
        })
    } else {
        try {
            const token = req.headers.authorization;
            const decoded: string | Record<string,any> = jwt.verify(token, process.env.JWT_SECRET as string);
    
            if (typeof decoded == "object") {
                req.user = decoded;
            }
    
            next();
        } catch (err) {
            return res.status(403).json({});
        }
    }


};

export default authMiddleware;
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authMiddleware = (req:Request|any, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).send("Auth Invalid");
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded: string | Record<string,any> = jwt.verify(token, process.env.JWT_SECRET as string);

        if (typeof decoded == "object") {
            req.userId = decoded.userId;
        }

        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

export default authMiddleware;
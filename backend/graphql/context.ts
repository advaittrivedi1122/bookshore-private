import dotenv from "dotenv";
dotenv.config();
import Users from "../database/models/Users";
import jwt from "jsonwebtoken";

// context for graphql that will be called before every mutation / query.
const context = async ({ req , res } : any) => {
    if (!req.headers.authorization) {
        return {}
    }
    try {
        const token: string = req.headers.authorization;
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log("🚀 ~ context ~ decodedToken:", decodedToken)
        const user = await Users.findById(decodedToken.id);
        if (!user) {
            return {};
        } else {
            console.log("🚀 ~ context ~ user:", user)
            return {user};
        }
    } catch (error) {
        console.log("🚀 ~ context ~ error:", error)
        return {}
    }
}

export default context;
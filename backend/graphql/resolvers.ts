import dotenv from "dotenv";
dotenv.config()
import Users from "../database/models/Users";
import Books from "../database/models/Books";
import * as Types from "../utils/types";
import { hashPassword } from "../utils/helpers"; 
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

const resolvers = {
    Mutation: {
        async reqisterUser(parent: any, args: any, context: any) {
            try {
                const { name, username, password, role }: Types.RegisterInput = args.RegisterInput;
                const hashedPassword = await hashPassword(password);
                const isExistingUser = await Users.findOne({
                    username : username                    
                })
                if (isExistingUser) {
                    console.log("🚀 ~ reqisterUser ~ existingUser:", isExistingUser)
                    throw new GraphQLError("User already exists!")
                } else {
                    const user = await Users.create({
                        name : name,
                        username : username,
                        password : hashedPassword,
                        role : role
                    })
                    const id = user._id;
                    const token = jwt.sign({
                        id
                    }, process.env.JWT_SECRET as string)
                }
            } catch (error: any) {
                console.log("🚀 ~ reqisterUser ~ error:", error)
                return {error : error.message}
            }
        }
    },
    Query: {
        async user(parent: any, args: any, context: any) {
            console.log("🚀 ~ user ~ resolver context:", context.user)
            return {
                id: "1",
                name: "Advait",
                walletAddress: "0x676b0490A802239Eeec703D9194A3f1771cf44A6",
                createdAt: new Date(),
                username: context.user.name,
                role: context.user.role,
                user: context.user
            }
        }
    }
}

export default resolvers;
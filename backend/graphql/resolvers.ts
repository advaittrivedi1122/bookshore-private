import dotenv from "dotenv";
dotenv.config()
import Users from "../database/models/Users";
import Books from "../database/models/Books";
import * as Types from "../utils/types";
import { hashPassword, verifyPassword } from "../utils/helpers"; 
import { UserError } from "graphql-errors";
import jwt from "jsonwebtoken";

const resolvers = {
    Mutation: {
        async registerUser(parent: any, args: any, context: any) {
            try {
                const { name, username, password, role }: Types.RegisterInput = args.registerInput;
                const hashedPassword = await hashPassword(password);
                const isExistingUser = await Users.findOne({
                    username : username                    
                })
                if (isExistingUser) {
                    throw new UserError("User already exists!")
                } else {
                    const user = await Users.create({
                        name : name,
                        username : username,
                        password : hashedPassword,
                        role : role
                    })
                    const id = user._id;
                    const token = jwt.sign({
                        id,
                        name,
                        username,
                        role
                    }, process.env.JWT_SECRET as string)
                    return {
                        user : {
                            id : user._id,
                            name : user.name,
                            username : user.username,
                            role : user.role
                        },
                        authToken : token,
                        message : "User registered successfully!"
                    }
                }
            } catch (error: any) {
                // return {error : error.message}
                throw new UserError(error.message);
            }
        },
        async loginUser(parent: any, args: any, context: any) {
            try {
                const { username, password } : Types.LoginInput = args.loginInput;

                const user: Types.User | null = await Users.findOne({
                    username : username
                })
                if(!user) {
                    throw new UserError("Invalid Username!")
                } else {
                    const isPasswordCorrect: boolean  = await verifyPassword(password, user.password as string);
                    if (!isPasswordCorrect) {
                        throw new UserError("Invalid Password!")
                    }
                    const token = jwt.sign({
                        id : user._id,
                        name : user.name,
                        username : user.username,
                        role : user.role
                    }, process.env.JWT_SECRET as string)
                    return {
                        user : {
                            id : user._id,
                            name : user.name,
                            username : user.username,
                            role : user.role
                        },
                        authToken : token,
                        message : "User logged in successfully!"
                    }
                }

            } catch (error: any) {
                // return {error : error.message}
                throw new UserError(error.message);
            }
        },
        async saveBook(parent: any, args: any, context: any) {
            try {
                const { bookName, uploadedBy, author, previewImageLink, bookPath, tags, description } = args.bookInput;
                const book: any = await Books.create({
                    bookName : bookName,
                    uploadedBy : uploadedBy,
                    author : author,
                    previewImageLink : previewImageLink,
                    bookPath : bookPath,
                    tags : tags,
                    description : description
                })
                const bookId: string = book._id;
                return {
                    bookId : bookId,
                    message : "Book saved successfully!"
                }
            } catch (error: any) {
                throw new UserError(error.message);
            }
        }
    },
    Query: {
        async user(parent: any, args: any, context: any) {
            
        }
    }
}

export default resolvers;
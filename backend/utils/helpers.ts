import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS))
    const hashedPassword: string = await bcrypt.hash("hello", salt)
    return hashedPassword;
}
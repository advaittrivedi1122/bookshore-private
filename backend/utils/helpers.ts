import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS))
    const hashedPassword: string = await bcrypt.hash(password, salt)
    return hashedPassword;
}

export async function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
    const isPasswordCorrect: boolean = await bcrypt.compare(password, passwordHash);
    return isPasswordCorrect;
}
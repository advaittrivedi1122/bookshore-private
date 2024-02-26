export type RegisterInput = {
    name : string;
    username : string;
    password : string;
    role : string;
}

export type LoginInput = {
    username : string;
    password : string;
}

export type User = {
    id ?: number;
    _id ?: number;
    name : string;
    username : string;
    role : string;
    password ?: string;
}
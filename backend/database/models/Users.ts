import mongoose, { Schema } from "mongoose";

// Database Schema for User

// 1 - name 
// 2 - username
// 3 - password
// 4 - role (user/author)
// 5 - favourites (Array of book Ids starred by user)

const UserSchema: Schema = new mongoose.Schema({
    name : {
        type : Schema.Types.String,
        required : true
    },
    username : {
        type : Schema.Types.String,
        required : true,
        unique : true
    },
    password : {
        type : Schema.Types.String,
        required : true
    },
    role : {
        type : Schema.Types.String,
        required : true,
        enum : ["user", "author"],
        lowercase : true
    },
    favourites : {
        type : Schema.Types.Array
    }
})

const Users = mongoose.model('Users', UserSchema);

export default Users;
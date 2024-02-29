import mongoose, { Schema } from "mongoose";

// Database Schema for Book

// 1 - bookName (bookName)
// 2 - author (author that uploaded the book - userId)
// 3 - previewImage (book preview image - optional)
// 4 - views (how many times the book has been viewed)
// 5 - downloads (how many times the book has been downloaded)
// 6 - bookPath (path to book pdf uploaded on the server)
// 7 - tags (tags for book description)
// 8 - description (description for the book - optional)

const BookSchema : Schema = new Schema({
    bookName : {
        type : Schema.Types.String,
        required : true,
        unique : true
    },
    uploadedBy : {
        type : Schema.Types.ObjectId,
        required : true
    },
    author: {
        type : Schema.Types.String,
        required : true
    },
    previewImageLink : {
        type : Schema.Types.String
    },
    bookLink : {
        type : Schema.Types.String,
        required : true
    },
    views : {
        type : Schema.Types.Number,
        default : 0
    },
    downloads : {
        type : Schema.Types.Number,
        default : 0
    },
    previewImagePath : {
        type : Schema.Types.String
    },
    bookPath : {
        type : Schema.Types.String,
        required : true
    },
    tags : {
        type : Schema.Types.String
    },
    description : {
        type : Schema.Types.String
    }
})

const Books = mongoose.model("Books", BookSchema);

export default Books;
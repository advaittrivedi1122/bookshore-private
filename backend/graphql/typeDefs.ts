import gql from "graphql-tag";

const typeDefs = gql`
    input RegisterInput {
        name: String!
        username: String!
        password: String!
        role: String!
    }
    input LoginInput {
        username: String!
        password: String!
    }
    input BookInput {
        bookName: String!
        uploadedBy: ID!
        author: String!
        bookLink: String!
        previewImageLink: String
        bookPath: String!
        previewImagePath: String
        tags: String
        description: String
    }
    type BookOutput {
        bookId: ID!
        message: String
    }
    type User {
        id: ID!
        name: String!
        username: String!
        role: String!
    }
    type Book {
        id: ID!
        name: String!
        uploadedBy: String!
        author: String!
        bookLink: String!
        previewImageLink: String
        bookPath: String!
        previewImagePath: String
        tags: String
        description: String
        views: Int
        downloads: Int
    }
    type RegisterOutput {
        user: User!
        authToken: String!
        message: String
    }
    type LoginOutput {
        user: User!
        authToken: String!
        message: String
    }
    type Query {
        user(id: ID!): User!
        getUsers: [User]
        getAllBooks: [Book]
    }
    type Mutation {
        registerUser(registerInput: RegisterInput): RegisterOutput
        loginUser(loginInput: LoginInput): LoginOutput
        saveBook(bookInput: BookInput): BookOutput
    }
`

export default typeDefs;
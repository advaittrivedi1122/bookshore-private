import gql from "graphql-tag";

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        role: String!
        createdAt: String
    }
    type RegisterInput {
        name: String!
        username: String!
        password: String!
        role: String!
    }
    type LoginInput {
        username: String!
        password: String!
    }
    type Query {
        user(id: ID!): User!
        getUsers: [User]
    }
    type Mutation {
        registerUser(registerInput: RegisterInput): User
        loginUser(loginInput: LoginInput): User
    }
`

export default typeDefs;
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
    type User {
        id: ID!
        name: String!
        username: String!
        role: String!
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
    }
    type Mutation {
        registerUser(registerInput: RegisterInput): RegisterOutput
        loginUser(loginInput: LoginInput): LoginOutput
    }
`

export default typeDefs;
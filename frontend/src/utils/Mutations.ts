export const LOGIN_USER = `
  mutation Mutation(
    $loginInput: LoginInput
  ) {
      loginUser(loginInput: $loginInput) {
        user {
          id
          name
          username
          role
        }
        authToken
        message
      }
    }
`;

export const REGISTER_USER = `
    mutation Mutation(
      $registerInput: RegisterInput
    ) {
        registerUser(registerInput: $registerInput) {
          user {
            id
            name
            username
            role
          }
          authToken
          message
        }
      }
`;
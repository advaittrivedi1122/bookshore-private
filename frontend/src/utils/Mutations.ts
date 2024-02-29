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
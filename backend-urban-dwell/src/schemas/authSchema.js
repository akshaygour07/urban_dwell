const { gql } = require("apollo-server-express");

const authSchema = gql`

  type AuthPayload {
    token: String!
  }

  type User {
    firstName: String!
    lastName: String!
    email: String!
    # profileImagePath: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input SignupInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Mutation {
    login(input: LoginInput!): AuthPayload!
    signup(input: SignupInput!): User!
  }
`;

module.exports = authSchema;

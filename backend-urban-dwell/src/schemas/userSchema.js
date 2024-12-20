const { gql } = require("apollo-server-express");

const userSchema = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    profileImagePath: String
  }

  input UserInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Query {
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
    deleteUser(id: ID!): User
  }
`;

module.exports = userSchema;

// @flow
export default `

enum BBQMethod {
  DIRECT
  INDIRECT
}

enum BBQIntensity{
  STRONG
  MEDIUM
  LOW
}

type User {
  _id: String! # the ! means that every author object _must_ have an id
  firstName: String
  lastName: String
  username: String!
  recipes: [Recipe]
  cookbooks: [Cookbook]
}

type Recipe {
  _id: String!
  title: String!
  description: String
  tags: [String]
  sequence: [Task]
  createdAt: String
  author: User
}

type Task {
  title: String!
  duration: Int
  intensity: BBQIntensity
  method: BBQMethod
}

type Cookbook {
  title: String!
  description: String
  tags: [String]
  recipes: [Recipe]
  createdAt: String
  author: User
}

type AuthPayload {
  token: String # JSON Web Token
  data: User
}

input recipeInput {
  title: String!
  description: String!
  tags: [String]
  sequence: [taskInput]
}

input taskInput {
  title: String!
  duration: Int
  intensity: BBQIntensity
  method: BBQMethod
}

# the schema allows the following queries:
type RootQuery {
  viewer: User
  author(username: String!): User
  authors: [User]
  recipes: [Recipe]
  cookbook: [Cookbook]
}

# this schema allows the following mutations:
type RootMutation {
  signUp (
    username: String!
    password: String!
    firstName: String
    lastName: String
  ): User

  logIn (
    username: String!
    password: String!
  ): AuthPayload

  createRecipe (
    recipe: recipeInput
  ): Recipe

}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: RootQuery
  mutation: RootMutation
}
`;

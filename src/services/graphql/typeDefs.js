// @flow
export default `

# A base64 encoded \`Image\`
scalar Image

# A list of BBQ methods
enum BBQMethod {
  DIRECT
  INDIRECT
}

# A list of BBQ intensities
enum BBQIntensity{
  STRONG
  MEDIUM
  LOW
}

# A User/Creator/Publisher
type User {
  _id: String! # the ! means that every author object _must_ have an id
  firstName: String
  lastName: String
  username: String!
  # The collection of recipes the User has published
  recipes: [Recipe]
  # The collection of cookbooks the User has published
  cookbooks: [Cookbook]
}

# A Recipe
type Recipe {
  _id: String!
  title: String!
  description: String
  # A collection of tags to filter recipes for
  tags: [String]
  # A collection of Tasks to follow
  sequence: [Task]
  createdAt: String
  author: User
  thumbnail(width: Int, height: Int, greyscale: Boolean): Image
}

# The task will be part of a sequence the user has to follow to create a dish
type Task {
  title: String!
  duration: Int
  intensity: BBQIntensity
  method: BBQMethod
}

# A cookbook that contains a collection of recipes
type Cookbook {
  _id: String!
  title: String!
  description: String
  # A collection of tags to filter cookbooks for
  tags: [String]
  recipes: [Recipe]
  createdAt: String
  author: User
  thumbnail(width: Int, height: Int, greyscale: Boolean): Image
}

# The payload which is needed to Authenticate
type AuthPayload {
  # JSON Web Token
  token: String # JSON Web Token
  data: User
}

# Input for Recipe
input RecipeInput {
  title: String!
  description: String!
  tags: [String]
  sequence: [TaskInput]
}

# Input for Tasks
input TaskInput {
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
    recipe: RecipeInput
    imageUrl: String
  ): Recipe

}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: RootQuery
  mutation: RootMutation
}
`;

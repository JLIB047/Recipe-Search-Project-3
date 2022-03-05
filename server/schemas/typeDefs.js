// typeDefs.js file

const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Recipe {
    _id: ID
    authors: [String]
    description: String
    recipeId: String
    image: String
    link: String
    title: String
}
type User {
    _id: ID
    username: String
    email: String
    recipeCount: Int
    savedRecipes: [Recipe]
}
type Query {
    me: User
}
type Auth {
    token: ID!
    user: User
}
input SavedRecipeInput {
    authors: [String]
    description: String
    recipeId: String
    image: String
    link: String
    title: String
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveRecipe(recipe: SavedRecipeInput): User
    removeRecipe(recipeId: String!): User
}
`;

module.exports = typeDefs;
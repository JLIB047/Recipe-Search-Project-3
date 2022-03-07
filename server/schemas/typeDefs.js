// typeDefs.js file

const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Recipe {
    _id: ID
    strInstructions: String
    idMeal: String
    image: String
    strMeal: String
    strCategory: String
    strYoutube: String
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
    strInstructions: String
    idMeal: String
    image: String
    strYoutube: String
    strMeal: String
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveRecipe(recipe: SavedRecipeInput): User
    removeRecipe(recipeId: String!): User
}
`;

module.exports = typeDefs;
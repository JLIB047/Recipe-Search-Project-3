// typeDefs.js file

const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Recipe {
    _id: ID
    strInstructions: String
    idMeal: String
    strMeal: String
   
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
input savedRecipe {
    strInstructions: String
    idMeal: String
    strMeal: String
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveRecipe(input: savedRecipe!): User
    removeRecipe(idMeal: ID!): User
}
`;

module.exports = typeDefs;
import gql from 'graphql-tag';

export const LOGIN_USER = gql `
    mutation login ($email: String!, $password: String!) {
        login(email: $email, password: $password){
            token
            user {
                _id 
                username
                email
                recipeCount
                savedRecipe {
                    recipeId
                    title
                    description
                    authors
                    image
                    link
                }
            }
        }
    }
`;

export const ADD_USER = gql `
    mutation addUser($username: String!, $email: String! $password: String!) {
        addUser(username: $username, email: $email, password: $password){
            token
            user {
                _id
                username
                email
                recipeCount
                savedRecipe {
                    recipeId
                    title
                    description
                    authors
                    image
                    link
                }
            }
        }
    }
`;

export const SAVE_RECIPE = gql `
    mutation saveRecipe($recipe: SavedRecipeInput!){
        saveRecipe(recipe: $recipe){
            username
            email
            recipeCount 
            savedRecipe {
                authors
                description 
                recipeId
                image
                link 
                title
            }
        }
    }
`;

export const REMOVE_RECIPE = gql `
    mutation removeRecipe($RecipeId: String!) {
        removeRecipe(recipeId: $RecipeId) {
            username
            email
            recipeCount
            saveRecipe {
                authors 
                description 
                recipeId
                image
                link 
                title
            }
        }
    }
`;
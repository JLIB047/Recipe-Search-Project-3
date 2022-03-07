import { gql } from '@apollo/client';

export const LOGIN_USER = gql `
    mutation login ($email: String!, $password: String!) {
        login(email: $email, password: $password){
            token
            user {
                _id 
                username
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
                idMeal
                strMeal
                strInstructions
                image
                strYoutube
                strCategory
            }
        }
    }
`;

// idMeal was recipeId 
export const REMOVE_RECIPE = gql `
    mutation removeRecipe($idMeal: String!) {
        removeRecipe(idMeal: $idMeal) {
            username
            email
            recipeCount
            saveRecipe {
                idMeal
                strMeal
                strInstructions
                image
                strYoutube
                strCategory
            }
        }
    }
`;
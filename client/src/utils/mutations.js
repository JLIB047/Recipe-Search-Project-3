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
    mutation saveRecipe($input:SavedRecipe!){
        saveRecipe( input:$input){
            username
            email 
            savedRecipes {
                idMeal
                strMeal
                strInstructions
                
            }
        }
    }
`;

// idMeal was recipeId 
export const REMOVE_RECIPE = gql `
    mutation removeRecipe($idMeal:ID!) {
        removeRecipe(idMeal: $idMeal) {
            username
            email
            savedRecipes {
                idMeal
                strMeal
                strInstructions
            }
        }
    }
`;
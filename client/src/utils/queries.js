import {gql} from '@apollo/client';

export const GET_ME = gql `
    {
        me{
            _id
            username
            email
            recipeCount
            savedRecipes {
                idMeal
                strMeal
                strInstructions
                image
                strYoutube
            }
        }
    }
`; 
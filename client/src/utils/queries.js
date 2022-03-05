import gql from "graphql-tag";

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
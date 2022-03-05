import gql from "graphql-tag";

export const GET_ME = gql `
    {
        me{
            _id
            username
            email
            recipeCount
            savedRecipes {
                IdMeal
                description
                strMeal
                image
                link
            }
        }
    }
`; 
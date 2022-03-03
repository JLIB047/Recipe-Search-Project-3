import gql from "graphql-tag";

export const GET_ME = gql `
    {
        me{
            _id
            username
            email
            recipeCount
            savedRecipes {
                recipeId
                description
                title
                image
                link
            }
        }
    }
`; 
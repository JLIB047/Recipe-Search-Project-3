import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/react-hooks'; 
import { GET_ME } from '../utils/queries';
import { REMOVE_RECIPE } from '../utils/mutations'
import Auth from '../utils/auth';
import { removeRecipeId } from '../utils/localStorage';

// TO-DO: update recipe Schema 
const SavedRecipes = () => {
    const { loading, data } = useQuery(GET_ME);
    const [deleteRecipe] = useMutation(REMOVE_RECIPE);
    const userData = data?.me || {};
    
    if(!userData?.username){
        return (
            <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in.
      </h4>
        );
    }

    const handleDeleteRecipe = async (idMeal) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token) {
            return false;
        }

    try{ 
        await deleteRecipe({
            variables: {idMeal: idMeal},
            update: cache => {
                const data = cache.readQuery({ query: GET_ME });
                const userDataCache = data.me;
                const savedRecipeCache = userDataCache.savedRecipes;
                const updatedRecipeCache = savedRecipeCache.filter((recipe) => recipe.idMeal !== idMeal);
                data.me.savedRecipes = updatedRecipeCache;
                cache.writeQuery({ query: GET_ME, data: {data: {...data.me.savedRecipes}}})
            }
        });

        removeRecipeId(idMeal);
    } catch(err) {
        console.log(err);
    }
    };

    if (loading) {
        return <h2>LOADING...</h2>
    }


        return (
        
        <>
            <Jumbotron fluid className='text-light bg-dark'>
              <Container>
                <h1>Viewing saved Recipes!</h1>
              </Container>
            </Jumbotron>
            <Container>
              <h2>
                {userData.savedRecipes.length
                  ? `Viewing ${userData.savedRecipes.length} saved ${userData.savedRecipes.length === 1 ? 'recipe' : 'recipes'}:`
                  : 'You have no saved recipes!'}
              </h2>
              <CardColumns>
                {userData.savedRecipes.map((recipe) => {
                  return (
                    <Card key={recipe.idMeal} border='dark'>
                      {recipe.image ? <Card.Img src={recipe.image} alt={`The cover for ${recipe.title}`} variant='top' /> : null}
                      <Card.Body>
                        <Card.Title>{recipe.title}</Card.Title>
                        <Card.Text>{recipe.description}</Card.Text>
                        <Button className='btn-block btn-danger' onClick={() => handleDeleteRecipe(recipe.idMeal)}>
                          Delete this Recipe!
                        </Button>
                      </Card.Body>
                    </Card>
                  );
                })}
              </CardColumns>
            </Container>
          </>
        );
};

export default SavedRecipes;


import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeRecipeId } from '../utils/localStorage';
import {useMutation, useQuery} from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_RECIPE } from '../utils/mutations';


const SavedRecipe = () => {

  const { loading, data} = useQuery(GET_ME);
  console.log(data);
  const [removeRecipe, {error}] = useMutation(REMOVE_RECIPE);

  const userData = data?.me || [];
//console.log(userData);

  // create function that accepts the recipe's mongo _id value as param and deletes the book from the database
  const handleDeleteRecipe = async (idMeal) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // const response = await deleteBook(bookId, token);
      const {data} = await removeRecipe({
        variables: { idMeal }
      });

      // upon success, remove book's id from localStorage
      removeRecipeId(idMeal);
    } catch (err) {
      console.error(err);
    }
  };
  
  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  //console.log(userData.savedRecipes);
  return (
    <>
      <Jumbotron fluid className='text-light bg-info'>
        <Container>
          <h1>Viewing saved recipes!</h1>
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
                {/* {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null} */}
                <Card.Body>
                  <Card.Title>{recipe.strMeal}</Card.Title>
                  <Card.Text>{recipe.strInstructions}</Card.Text>
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

export default SavedRecipe;

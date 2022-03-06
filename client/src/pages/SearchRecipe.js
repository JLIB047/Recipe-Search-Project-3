import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
//import { searchRecipe } from '../utils/API'
import Auth from '../utils/auth';
import { saveRecipeIds, getSavedRecipeIds } from '../utils/localStorage';
import { useMutation } from '@apollo/react-hooks';
import {SAVE_RECIPE} from '../utils/mutations';
import {GET_ME} from '../utils/queries';

const SearchRecipes = () => {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [savedRecipeIds, setSavedRecipeIds] = useState(getSavedRecipeIds());
    const [saveRecipe] = useMutation(SAVE_RECIPE);

    useEffect(() => {
        return () => saveRecipeIds(savedRecipeIds);
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if(!searchInput) {
            return false;
        }

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
             
            if(!response.ok) {
                throw new Error('something went wrong!');
            }
           

            const { items } = await response.json();
              console.log({items});
            const recipeData = items.map((recipe) => ({
              //TO-DO: match recipe schema 
                idMeal: recipe.id,
                strMeal: recipe.strMeal,
                strInstructions: recipe.strInstructions,
                //image: recipe.imageLinks?.thumbnail || '',
            }));

            setSearchedRecipes(recipeData);
            setSearchInput('');
        } catch(err){
            console.error(err);
            console.log(err);
        }
    };

    const handleSaveRecipe = async (idMeal) => {
        const recipeToSave = searchedRecipes.find((recipe) => recipe.idMeal === idMeal);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token){
            return false;
        }

        try {
            await saveRecipe({
                variables: {recipe: recipeToSave},
                update: cache => {
                    const {me} = cache.readQuery({ query: GET_ME });
                    cache.writeQuery({ query: GET_ME , data: {me: {...me, savedRecipe: [...me.savedRecipes, recipeToSave] } } })
                }
            });
            setSavedRecipeIds([...savedRecipeIds, recipeToSave.idMeal]);
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for recipes!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a Recipe'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedRecipes.length
            ? `Viewing ${searchedRecipes.length} results:`
            : 'Search for a recipe to begin'}
        </h2>
        <CardColumns>
          {searchedRecipes.map((recipe) => {
            return (
              <Card key={recipe.idMeal} border='dark'>
                {/* {recipe.image ? (
                  <Card.Img src={recipe.image} alt={`The cover for ${recipe.strMeal}`} variant='top' />
                ) : null} */}
                <Card.Body>
                  <Card.Title>{recipe.strMeal}</Card.Title>
                  
                  <Card.Text>{recipe.strInstructions}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedRecipeIds?.some((savedRecipeId) => savedRecipeId === recipe.idMeal)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveRecipe(recipe.idMeal)}>
                      {savedRecipeIds?.some((savedRecipeId) => savedRecipeId === recipe.idMeal)
                        ? 'This recipe has already been saved!'
                        : 'Save this Recipe!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
    
};

export default SearchRecipes;
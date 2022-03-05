import React, { useState, useEffect } from 'react';
//import { useMutation } from '@apollo/client';
//import { SAVE_RECIPE } from '../utils/mutation';
//import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
//import Auth from '../utils/auth';
//import {  searchRecipeDB } from '../utils/API';
//import { saveRecipeIds, getSavedRecipeIds } from '../utils/localStorage';

// search recipe function
const SearchRecipes = () => {
    // create state for holding returned recipe api data
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');
  
    // create state to hold saved RecipeId values
    const [savedRecipeIds, getSavedRecipeIds] = useState(getSavedRecipeIds());

    const [saveRecipe, { error }] = useMutation(SAVE_RECIPE);
    // set up useEffect hook to save `savedRecipeIds` list to localStorage on component unmount
    // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    useEffect(() => {
      return () => saveRecipeIds(savedRecipeIds);
    });
   
   // create method to search for books and set state on form submit
    const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchRecipeDB(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const recipeData = items.map((recipe) => ({
        recipeId: recipe.id,
        title: recipe.volumeInfo.title,
        description: recipe.volumeInfo.description,
        image: recipe.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedRecipes(recipeData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleSaveRecipe = async (recipeId) => {
    // find the recipe in `searchedrecipes` state by the matching id
    const recipeToSave = searchedRecipes.find((recipe) => recipe.recipeId === recipeId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveRecipe({
        variables: {...recipeToSave},
      });
     
      console.log(savedRecipeIds);
      // if recipe successfully saves to user's account, save recipe id to state
      setSavedRecipeIds([...savedRecipeIds, recipeToSave.recipeId]);
    } catch (err) {
      console.error(err);
    }
  };
}

export default SearchRecipes;

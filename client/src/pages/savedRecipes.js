import React from 'react';
//import { useQuery } from '@apollo/client';
//import{GET_ME} from '../utils/queries';
//import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
//import { useMutation } from '@apollo/client';
//import {REMOVE_RECIPE} from '../utils/mutation';

//import { getMe, deleteRecipe } from '../utils/API';
import Auth from '../utils/auth';
import { removeRecipeId } from '../utils/localStorage';

const SavedRecipes = () => {

 const {loading , data} =useQuery(GET_ME);
 const [removeRecipe, { error }] = useMutation(REMOVE_RECIPE);
 const userData = data?.me || {};
  // use this to determine if `useEffect()` hook needs to run again
 const userDataLength = Object.keys(userData).length;

  // create function that accepts the recipe's mongo _id value as param and deletes the recipe from the database
    const handleDeleteRecipe = async (recipeId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await removeRecipe({
        variables: {recipeId},
      });
      // upon success, remove recipe's id from localStorage
      removeRecipeId(recipeId);
     
    } catch (err) {
      console.error(err);
    }
  }; 
  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
}


export default SavedRecipes;
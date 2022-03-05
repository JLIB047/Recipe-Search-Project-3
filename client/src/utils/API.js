// If push error, delete the file locally 

export const getMe = (token) => {
    return fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const createUser = (userData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  export const loginUser = (userData) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  // save recipe data for a logged in user
  export const saveRecipe = (recipeData, token) => {
    return fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recipeData),
    });
  };
  
  // remove saved recipe data for a logged in user
  export const deleteRecipe = (idMeal, token) => {
    return fetch(`/api/users/recipes/${idMeal}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };
  
  // make a search to recipe api
  export const searchRecipe = (query) => {
    return fetch(`www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  };
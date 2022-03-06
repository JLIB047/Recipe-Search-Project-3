import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {setContext} from '@apollo/client/link/context';
import SearchRecipe from './pages/searchRecipe';
import SavedRecipe from './pages/SavedRecipe';
import NavBar from './components/NavBar';
import './App.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});




function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <NavBar />
        <Switch>
          <Route exact path='/' component={SearchRecipe} />
          <Route exact path='/saved' component={SavedRecipe} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;

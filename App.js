import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://seu-servidor-graphql:4000', // Substitua pelo seu URL GraphQL
  cache: new InMemoryCache(),
});

const App = () => {

 
    return <AppNavigation />;
 
};

export default App;

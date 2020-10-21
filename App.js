import 'react-native-gesture-handler';

import React from 'react';



import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import AuthContextProvider from './context/authContext'
import { NavigationContainer } from '@react-navigation/native';
import LoginStack from './routes/index'

import NavigatorDrawer from './routes/drawer'

const client = new ApolloClient({
  uri: 'http://ec2-3-236-247-99.compute-1.amazonaws.com:4000/',
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <NavigationContainer>
          <LoginStack />
        </NavigationContainer>
      </AuthContextProvider>
    </ApolloProvider>
  );
}

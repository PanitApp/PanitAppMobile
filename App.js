import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';


import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import AuthContextProvider from './context/authContext'
import CursosContextProvider from './context/cursosContext'
import { NavigationContainer } from '@react-navigation/native';
import LoginStack from './routes/index'
import AsyncStorage from '@react-native-community/async-storage';
import { setContext } from '@apollo/client/link/context';

import NavigatorDrawer from './routes/drawer'

import firebase from './database/firebase';

const httpLink = createHttpLink({
  uri: 'http://ec2-3-237-4-115.compute-1.amazonaws.com:4000/',
});

const authLink = setContext( async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// const client = new ApolloClient({
//   uri: 'http://ec2-3-235-223-5.compute-1.amazonaws.com:4000/',
//   cache: new InMemoryCache(),
//   defaultOptions:{
//     query:{
//       fetchPolicy: "no-cache"
//     }
//   }
// });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (!fontsLoaded) {
      Font.loadAsync({
        'Roboto_medium': require('./assets/fonts/Roboto-Medium.ttf')
      })
    }
  })

  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <LoginStack />
      </AuthContextProvider>
    </ApolloProvider>
  );
}

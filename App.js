import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/login'
import Inicio from './components/inicio'

const client = new ApolloClient({
  uri: 'http://ec2-3-236-121-186.compute-1.amazonaws.com:4000',
  cache: new InMemoryCache()
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login">
            {props => <Login {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Home">
            {props => <Inicio {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>

    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

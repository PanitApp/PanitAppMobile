import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';



import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './components/login'
import Inicio from './components/inicio'

import Navigator from './routes/drawer'

const client = new ApolloClient({
  uri: 'http://ec2-3-236-121-186.compute-1.amazonaws.com:4000',
  cache: new InMemoryCache()
});

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {/* <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Login} />
          <Drawer.Screen name="Notifications" component={Inicio} />
        </Drawer.Navigator> */}

        {/* <Stack.Navigator>
          <Stack.Screen name="Login">
            {props => <Login {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Home">
            {props => <Inicio {...props} />}
          </Stack.Screen>
        </Stack.Navigator> */}

        <Navigator/>
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

import 'react-native-gesture-handler';

import React from 'react';

import Registro from './components/registro.js'  

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { createStackNavigator } from '@react-navigation/stack';
import AuthContextProvider from './context/authContext'
import Navigator from './routes/index'

const client = new ApolloClient({
    uri: 'http://ec2-54-146-196-241.compute-1.amazonaws.com:4000/',
    cache: new InMemoryCache()
});

const Stack = createStackNavigator();

export default function App() {
    return (
        <ApolloProvider client={client}>
            <AuthContextProvider>
                <Navigator />
            </AuthContextProvider>
        </ApolloProvider>
    );
}
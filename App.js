import 'react-native-gesture-handler';

import React from 'react';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { createStackNavigator } from '@react-navigation/stack';
import AuthContextProvider from './context/authContext'
import Navigator from './routes/index'
import { NavigationContainer } from '@react-navigation/native';

const client = new ApolloClient({
    uri: 'http://ec2-3-236-247-99.compute-1.amazonaws.com:4000/',
    cache: new InMemoryCache()
});

export default function App() {
    return (
        <ApolloProvider client={client}>
            <AuthContextProvider>
                <Navigator />
            </AuthContextProvider>
        </ApolloProvider>
    );
}
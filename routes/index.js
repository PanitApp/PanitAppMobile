import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/login'
import Inicio from '../components/inicio'
import { AuthContext } from '../context/authContext'
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

export default function Navigator() {

    const { isLogged } = useContext(AuthContext)

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLogged ? (
                    <Stack.Screen name="Home">
                        {props => <Inicio {...props} />}
                    </Stack.Screen>
                ) : (
                    <Stack.Screen name="Login">
                        {props => <Login {...props} />}
                    </Stack.Screen>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

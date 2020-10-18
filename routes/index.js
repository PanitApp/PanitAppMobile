import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/login'
import Inicio from '../components/inicio'
import { AuthContext } from '../context/authContext'
import { NavigationContainer } from '@react-navigation/native';
import Registro from '../components/registro' 


const Stack = createStackNavigator();

export default function Navigator() {

    const { user } = useContext(AuthContext)

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Registro">
                    {props => <Registro {...props} />}
                </Stack.Screen>
                {/* {user != null ? (
                    <Stack.Screen name="Home">
                        {props => <Inicio {...props} />}
                    </Stack.Screen>
                ) : (
                    <Stack.Screen name="Login">
                        {props => <Login {...props} />}
                    </Stack.Screen>
                )} */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

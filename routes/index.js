import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/login'
import Inicio from '../components/inicio'
import { AuthContext } from '../context/authContext'
import { NavigationContainer } from '@react-navigation/native';
import InicioDrawer from './drawer'
import { DrawerActions } from '@react-navigation/native';
import { Button } from 'react-native'

const Stack = createStackNavigator();

export default function Navigator({ navigation }) {

    const { isLogged } = useContext(AuthContext)

    return (

        <Stack.Navigator headerMode='none'>
            {isLogged ? (
                <Stack.Screen name="Home">
                    {props => <InicioDrawer {...props} />}
                </Stack.Screen>
            ) : (
                    <Stack.Screen name="Login">
                        {props => <Login {...props} />}
                        {/* Registrarse */}
                    </Stack.Screen>

                )
            }
        </Stack.Navigator>

    );
}

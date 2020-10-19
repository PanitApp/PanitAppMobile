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

    const { isLogged } = useContext(AuthContext)

    return (
        <NavigationContainer>
                {isLogged ? (
            <Stack.Navigator headerMode='none'>
                <Stack.Screen name="Home">
                    {props => <Inicio {...props} />}
                </Stack.Screen>
            </Stack.Navigator>
                ) : (
                    <Stack.Navigator headerMode='none'>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Registro" component={Registro} />
                    </Stack.Navigator>
                    )
                }
        </NavigationContainer>

    );
}

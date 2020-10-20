import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MisTrabajos from '../screens/misTrabajos'
import TrabajoDetalle from '../screens/trabajoDetalle'
import { AuthContext } from '../context/authContext'
import { DrawerActions } from '@react-navigation/native';
import { Icon, Button } from 'native-base';

const Stack = createStackNavigator();

export default function Navigator({ navigation }) {

    return (

        <Stack.Navigator initialRouteName="MisTrabajos">
            <Stack.Screen
                name="MisTrabajos"
                component={MisTrabajos}
                options={{
                    headerLeft: () => (
                        <Button transparent onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                            <Icon name='menu' style={{ color: '#03979E' }} />
                        </Button>
                    ),
                    headerTitle: 'Mis trabajos'
                }}
            />
            <Stack.Screen
                name="TrabajoDetalle"
                component={TrabajoDetalle}
                options={{
                    headerTitle: 'Detalle trabajo'
                }}
            />
        </Stack.Navigator >

    );
}

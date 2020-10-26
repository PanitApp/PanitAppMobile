import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MisDatos from '../screens/misDatos';
import { DrawerActions } from '@react-navigation/native';
import { Icon, Button } from 'native-base';

const Stack = createStackNavigator();

export default function Navigator({ navigation, route }) {

    return (
        <Stack.Navigator initialRouteName="MisDatos">
            <Stack.Screen name="MisDatos"
                component={MisDatos}
                options={{
                    headerLeft: () => (
                        <Button transparent onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                            <Icon name='menu' style={{ color: '#03979E' }} />
                        </Button>
                    ),
                    headerTitle: 'Editar mis datos',
                    cursos:route.params
                }}
            />
        </Stack.Navigator >
    );
}

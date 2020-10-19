import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/login'
import Inicio from '../components/inicio'
import MisCursos from '../screens/misCursos'
import CursoDetalle from '../screens/cursoDetalle'
import { AuthContext } from '../context/authContext'
import Menu from '../components/menu'
import { DrawerActions } from '@react-navigation/native';
import { Header, Content, Icon, Right, Body, Button, Left, Title } from 'native-base';

const Stack = createStackNavigator();

export default function Navigator({ navigation }) {

    const { isLogged } = useContext(AuthContext)

    return (

        <Stack.Navigator initialRouteName="MisCursos">
            <Stack.Screen
                name="MisCursos"
                component={MisCursos}
                options={{
                    headerLeft: () => (
                        <Button transparent onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                            <Icon name='menu' style={{ color: '#03979E' }} />
                        </Button>
                    ),
                    headerTitle: 'Mis cursos'
                }}
            />
            <Stack.Screen
                name="CursoDetalle"
                component={CursoDetalle}
                options={{
                    headerTitle: 'Detalle curso'
                }}
            />
        </Stack.Navigator >

    );
}

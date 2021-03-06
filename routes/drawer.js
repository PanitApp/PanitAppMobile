import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import Inicio from '../components/inicio';
import { AuthContext } from '../context/authContext';
import { NavigationContainer } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import MisCursos from './cursos';
import MisDatos from './editarMisDatos';
import Chats from './chats'
import CursosContextProvider from '../context/cursosContext';


const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {

    const { user, logout } = useContext(AuthContext)

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Cerrar sesión"
                onPress={logout}
            />
        </DrawerContentScrollView>
    );
}

export default function Navigator({ navigation }) {

    const dimensions = useWindowDimensions();

    return (
        <CursosContextProvider>
            <Drawer.Navigator drawerType='slide' backBehavior='initialRoute' initialRouteName="Inicio" drawerContent={props => <CustomDrawerContent {...props} />} >
                <Drawer.Screen name="Inicio" component={Inicio} />
                <Drawer.Screen name="Mis cursos">
                    {props => <MisCursos {...props} />}
                </Drawer.Screen>
                <Drawer.Screen name="Editar mis datos">
                        {props => <MisDatos {...props} />}
                    </Drawer.Screen>
                <Drawer.Screen name="Chats">
                    {props => <Chats {...props} />}
                </Drawer.Screen>
            </Drawer.Navigator>
        </CursosContextProvider>
    );
}

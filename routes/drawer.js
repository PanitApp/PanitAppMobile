import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from '../components/login'
import Inicio from '../components/inicio'
import { createAppContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator({
    Inicio: {
        screen: Inicio,
    },
    Login: {
        Screen: Login
    }
});

export default createAppContainer(Drawer)
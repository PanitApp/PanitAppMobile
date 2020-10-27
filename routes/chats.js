import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { Button, Icon } from 'native-base';
import Chats from '../screens/misChats'
import Chat from '../screens/chat'

const Stack = createStackNavigator();

export default function Navigator({ navigation, route }) {

    return (
        <Stack.Navigator initialRouteName="Chats">
            <Stack.Screen
                name="Chats"
                component={Chats}

                options={{
                    headerLeft: () => (
                        <Button transparent onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                            <Icon name='menu' style={{ color: '#03979E' }} />
                        </Button>
                    ),
                    headerTitle: 'Chats',
                    chats: route.params
                }}
            />
            <Stack.Screen
                name="Chat"
                component={Chat}
                options={{
                    headerTitle: 'Chat'
                }}
            />
        </Stack.Navigator >

    );
}

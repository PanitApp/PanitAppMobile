import React, { useContext } from 'react';
import { Header, Content, Icon, Right, Body, Button, Left, Title, Text } from 'native-base';
import { DrawerActions } from '@react-navigation/native';


export default function Menu({ navigation }) {
  return (
    <Content >
      <Header style={{ backgroundColor: 'white' }}>
        <Left>
          <Button transparent onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Icon name='menu' style={{ color: '#03979E' }} />
          </Button>
        </Left>
        <Right />
      </Header>
    </Content>
  );
}
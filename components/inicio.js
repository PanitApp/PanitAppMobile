// In App.js in a new project

import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../context/authContext'

function HomeScreen({ navigation }) {
  
  const {user, logout } = useContext(AuthContext)

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        
        <Text> Usuario:{user.nombre_usuario}</Text>
        
        <Button title="Cerrar sesion" onPress={logout}/>

      </View>
    );
  }

export default HomeScreen;
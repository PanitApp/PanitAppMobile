// In App.js in a new project

import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../context/authContext'

function HomeScreen({ navigation }) {
  
  const { user } = useContext(AuthContext)

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        
        <Text> Usuario:{user.nombre_usuario}</Text>
        
      </View>
    );
  }

export default HomeScreen;
// In App.js in a new project

import React, { useContext } from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import { AuthContext } from '../context/authContext'
import { Container, Header, Content, Card, CardItem, Icon, Right, Body, Button, Text, Left, Title } from 'native-base';

import { Col, Row, Grid } from "react-native-easy-grid";

import { DrawerActions } from '@react-navigation/native';
import logo from '../assets/logo1.png';
const { width: WIDTH } = Dimensions.get('window');


function HomeScreen({ name,props }) {

  const { user, logout } = useContext(AuthContext)


  return (
    <Content>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>PanitaApp</Title>
        </Body>
        <Right />
      </Header>
      <View style={styles.backgroundColor}>
        <View style={{ backgroundColor: 'white', width: WIDTH - 30, alignItems: 'center', flex: 1 }}>
          <Text style={styles.title}>¡ Bienvenido !</Text>
          <Text>{user.nombres}</Text>
          <Image source={logo} style={styles.logo}></Image>

          {/* CURSOS */}
          <Card style={{ width: WIDTH - 60 }}>
            <CardItem header bordered>
              <Text style={styles.cardTitle}>Mis cursos</Text>
            </CardItem>
            <CardItem>
              <Icon active name="school" />
              <Text>Curso</Text>
              <Right>
                <Icon name="arrow-round-forward" />
              </Right>
            </CardItem>
            <CardItem footer bordered>
              <Body>
                <Button transparent >
                  <Text style={styles.cardTitle}>Ver todos mis cursos</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>

          {/* NOTAS, VERDE: success, NARANJA: warning, ROJO: danger */}
          <Card style={{ width: WIDTH - 60 }}>
            <CardItem header bordered>
              <Text style={styles.cardTitle}>Mis notas</Text>
            </CardItem>
            <CardItem>
              <Left>
                <Button rounded small success>
                  <Text>4.5</Text>
                </Button>
              </Left>
              <Body>
                <Text>Nota trabajo X</Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Body>
                <Button transparent >
                  <Text style={styles.cardTitle}>Ver todas mis notas</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>

          {/* TRABAJOS */}
          <Card style={{ width: WIDTH - 60 }}>
            <CardItem header bordered>
              <Text style={styles.cardTitle}>Mis trabajos</Text>
            </CardItem>
            <CardItem >
              <Icon active name="checkmark-circle" style={{ color: 'red' }} />
              <Text>Pendiente</Text>
              <Right >
                <Icon name="arrow-round-forward" />
              </Right>
            </CardItem>
            <CardItem >
              <Icon active name="checkmark-circle" style={{ color: 'green' }} />
              <Text>Revisado</Text>
              <Right >
                <Icon name="arrow-round-forward" />
              </Right>
            </CardItem>
            <CardItem >
              <Icon active name="checkmark-circle" style={{ color: 'orange' }} />
              <Text>Entregado</Text>
              <Right >
                <Icon name="arrow-round-forward" />
              </Right>
            </CardItem>
            <CardItem footer bordered>
              <Body>
                <Button transparent >
                  <Text style={styles.cardTitle}>Ver todos mis trabajos</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>

        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>

          <Text> Usuario:{user.nombre_usuario}</Text>
          <Button primary onPress={logout} >
            <Text >Cerrar sesión</Text>
          </Button>

        </View>
      </View>
    </Content>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  backgroundColor: {
    flex: 1,
    backgroundColor: '#03979E',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    color: '#03979e',
    paddingTop: 30,
    fontSize: 40,
  },
  logo: {
    width: WIDTH - 90,
    height: 120,
    margin: 20,
  },
  cardTitle: {
    color: '#037E85',
  }
})